import userService, {UserData} from "../services/user-service";
import {Request, Response, NextFunction} from "express";
import UserService from "../services/user-service";
import {validationResult} from "express-validator";
import ApiError from "../exceptions/api-error";
import {DeleteResult} from "mongodb";
import {IUser} from "../models/user-model";
import { IGetUserAuthInfoRequest } from "../middlewares/auth-middleware";

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest("Validation error", errors.array()))
            }

            const {email, password, avatar} = req.body
            const userData: UserData = await userService.registration(email, password, avatar)
            res.cookie(
                'refreshToken',
                userData.tokens.refreshToken,
                {
                    maxAge: 30 * 24 * 60 * 69 * 1000,
                    httpOnly: true,
                    secure: true
                    }
                )
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            const userData: UserData = await userService.login(email, password)
            res.cookie(
                'refreshToken',
                userData.tokens.refreshToken,
                {
                    maxAge: 30 * 24 * 60 * 69 * 1000,
                    httpOnly: true,
                    // secure: true
                }
            )
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies
            const result:DeleteResult = await userService.logout(refreshToken)
            if(result.deletedCount == 0){
                return next(ApiError.BadRequest("Something wrong"))
            }
            res.clearCookie("refreshToken")
            return res.status(200).json({
                message: "Success logout"}
            )
        } catch (e) {
            next(e)
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link;
            await UserService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL!)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies
            const userData:UserData = await userService.refresh(refreshToken)
            res.cookie(
                'refreshToken',
                userData.tokens.refreshToken,
                {
                    maxAge: 30 * 24 * 60 * 69 * 1000,
                    httpOnly: true,
                    // secure: true
                }
            )
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return next(ApiError.UnauthorizedError())
            }
            const users: IUser[] = await userService.getAllUsers(req.user.role)
            res.json(users)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController()