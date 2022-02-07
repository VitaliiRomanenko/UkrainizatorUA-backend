import {NextFunction, Request, Response} from "express";
import ApiError from "../exceptions/api-error";
import {IGetUserAuthInfoRequest} from "../middlewares/auth-middleware";
import MemberDto from "../dtos/member-dto";
import MemberService from "../services/member-service";
import {DeleteResult} from "mongodb";
import {IMemberSchema} from "../models/member-model";

class MemberController {
    async createNewMember(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
        try {
            const {post} = req.body
            const newMember: MemberDto = await MemberService.addMember(post, req.user!.id)
            return res.json(newMember)
        } catch (e) {
            next(e)
        }
    }
    async leavePost(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
        try {
            const {post} = req.body
            const result: DeleteResult = await MemberService.leave(post, req.user!.id)
            console.log(result)
            return res.sendStatus(result.deletedCount? 200: 400)
        } catch (e) {
            next(e)
        }
    }
    async AllUsersMember(req: Request, res: Response, next: NextFunction) {
        try {
            const user: string | null = req.body.user
            if(!user){
                return next(ApiError.BadRequest("Invalid user"))
            }
            const members: IMemberSchema[] = await MemberService.getAllUserMembers(user)
            res.json(members)
        } catch (e) {
            next(e)
        }
    }
    async AllPostMembers(req: Request, res: Response, next: NextFunction) {
        try {
            const post: string | null = req.body.post
            if(!post){
                return next(ApiError.BadRequest("Invalid user"))
            }
            const members: IMemberSchema[] = await MemberService.getAllPostMembers(post)
            res.json(members)
        } catch (e) {
            next(e)
        }
    }
}

export default new MemberController()