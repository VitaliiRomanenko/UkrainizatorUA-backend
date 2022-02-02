import TokenModel from "../models/token-model";
import tokenModel, {IToken} from "../models/token-model";
import UserDto, {IUserDto} from "../dtos/user-dto";
import {DeleteResult} from "mongodb";

const jwt = require('jsonwebtoken')

export type Tokens = {
    accessToken: string,
    refreshToken: string
}

interface ITokenService {
    generateTokens(payload: IUserDto): Tokens,

    saveToken(userId: String, refreshToken: String): Promise<IToken>
}

class TokenService implements ITokenService {
    generateTokens(payload: IUserDto): Tokens {
        const accessToken: string = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken: string = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }
    validateAccessToken(token: string): UserDto | null{
        try{
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET,  {algorithms: ['HS256']})
        }catch (e){
            return null
        }
    }
    validateRefreshToken(token: string): UserDto | null{
        try{
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET, {algorithms: ['HS256']})
        }catch (e){
            return null
        }
    }
    async saveToken(userId: string, refreshToken: string): Promise<IToken> {
        const tokenData: IToken | null = await TokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        return await TokenModel.create({user: userId, refreshToken})
    }

    async removeToken(refreshToken: string): Promise<DeleteResult> {
        return tokenModel.deleteOne({refreshToken});
    }
    async findToken(refreshToken: string): Promise<IToken | null>{
        return tokenModel.findOne({refreshToken});
    }

}

export default new TokenService()