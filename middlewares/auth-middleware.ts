import {NextFunction, Request, Response} from "express";
import ApiError from "../exceptions/api-error";
import tokenService from "../services/token-service";
import UserDto from "../dtos/user-dto";

export interface IGetUserAuthInfoRequest extends Request{
    user?: UserDto
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
        const userData: UserDto | null = tokenService.validateAccessToken(accessToken)
        if (!userData){
            return next(ApiError.UnauthorizedError())
        }
        req.user = userData
        next()
    }catch (e){
        return next(ApiError.UnauthorizedError())
    }
}