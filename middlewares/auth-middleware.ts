import {NextFunction, Request, Response} from "express";
import ApiError from "../exceptions/api-error";
import {UserData} from "../services/user-service";
import tokenService from "../services/token-service";

export interface IGetUserAuthInfoRequest extends Request{
    user?: UserData
}

export default function (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    try{
        const authorizationHeader: string | undefined = req.headers.authorization
        if (!authorizationHeader){
            return next(ApiError.UnauthorizedError())
        }
        const accessToken = authorizationHeader.split(" ")[1];
        if (!accessToken){
            return next(ApiError.UnauthorizedError())
        }
        const userData: UserData | null = tokenService.validateAccessToken(accessToken)
        if (!userData){
            return next(ApiError.UnauthorizedError())
        }
        req.user = userData
        next()
    }catch (e){
        return next(ApiError.UnauthorizedError())
    }
}