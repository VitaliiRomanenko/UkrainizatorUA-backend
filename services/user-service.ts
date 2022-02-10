import UserModel, {IUser} from "../models/user-model";
import TokenService from "./token-service";
import tokenService, {Tokens} from "./token-service";
import UserDto, {IUserDto} from "../dtos/user-dto";
import mailService from "./mail-service";
import ApiError from "../exceptions/api-error";
import {DeleteResult} from "mongodb";
import {IToken} from "../models/token-model";

const bcrypt = require('bcrypt')
const uuid = require('uuid')

export type UserData = {
    tokens: Tokens,
    user: IUserDto
}

class UserService {
    /**
     * Registers a new user
     * @param email - New user email
     * @param password - New user password
     * @param avatar - img link (not required)
     * @returns {Promise<UserData>} - created new user
     */
    async registration(email: string, password: string, avatar?: string): Promise<UserData> {
        const candidate: IUser | null = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`User: ${email} is already exist`)
        }
        const hashPassword: string = await bcrypt.hash(password, 3)
        const activationLink: string = await uuid.v4()

        const user: IUser = await UserModel.create({email, password: hashPassword, activationLink, avatar})

        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {tokens, user: userDto}
    }


    /**
     * Change User.isActivated to the true
     * @param activationLink - Link from Email. Stored in DB (User)
     */
    async activate(activationLink: string): Promise<void> {
        const user: IUser | null = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest("Invalid activation link")
        }

        user!.isActivated = true;
        await user!.save();
    }

    async login(email: string, password: string): Promise<UserData> {
        const user: IUser | null = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest("Unknown user")
        }
        const isPassEquals: boolean = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest("Invalid password")
        }
        const userDto: UserDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {tokens, user: userDto}
    }

    async getUser(userId: string): Promise<UserDto> {
        const user: IUser | null = await UserModel.findOne({_id: userId})
        if (!user) {
            throw ApiError.BadRequest("Unknown user")
        }
        return new UserDto(user)
    }

    async logout(refreshToken: string): Promise<DeleteResult> {
        return await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken: string): Promise<UserData> {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB: IToken | null = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }
        const user: IUser | null = await UserModel.findById(userData.id)
        const userDto: UserDto = new UserDto(user!)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {tokens, user: userDto}
    }

    async getAllUsers(role: string): Promise<IUserDto[]> {
        if (role !== "admin") {
            throw ApiError.NotAccess()
        }
        const findData: IUser[] = await UserModel.find()
        return findData.map(item => new UserDto(item))
    }
}

export default new UserService()