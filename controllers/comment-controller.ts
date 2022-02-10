import {NextFunction, Request, Response} from "express";
import ApiError from "../exceptions/api-error";
import {IGetUserAuthInfoRequest} from "../middlewares/auth-middleware";
import CommentDto from "../dtos/comment-dto";
import CommentService from "../services/comment-service";

class CommentController {
    async createNewComment(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
        try {
            const {post, text} = req.body
            const newComment: CommentDto = await CommentService.addComment(post, req.user!.id, text)
            return res.json(newComment)
        } catch (e) {
            next(e)
        }
    }
    async AllUserComments(req: Request, res: Response, next: NextFunction) {
        try {
            const user: string | null = req.body.user
            if(!user){
                return next(ApiError.BadRequest("Invalid user"))
            }
            const comments: CommentDto[] = await CommentService.getAllUserComments(user)
            res.json(comments)
        } catch (e) {
            next(e)
        }
    }
    async AllPostComments(req: Request, res: Response, next: NextFunction) {
        try {
            const post: string | null = req.body.post
            if(!post){
                return next(ApiError.BadRequest("Invalid post"))
            }
            const comments: CommentDto[] = await CommentService.getAllPostComments(post)
            res.json(comments)
        } catch (e) {
            next(e)
        }
    }
}

export default new CommentController()