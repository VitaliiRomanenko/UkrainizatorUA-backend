import {NextFunction, Request, Response} from "express";
import {IGetUserAuthInfoRequest} from "../middlewares/auth-middleware";
import PostService from "../services/post-service";
import {Types} from "mongoose";
import PostDto from "../dtos/post-dto";
import {IPostSchema} from "../models/post-model";

class PostController {
    async createPost(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
        try {
            const {header, description, category, language, photo, link} = req.body
            const newPost: PostDto = await PostService.createPost({
                header,
                description,
                category,
                language,
                photo,
                link,
                author: new Types.ObjectId(req.user!.id)
            })
            return res.json(newPost)
        } catch (e) {
            next(e)
        }
    }

    async getAllPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const posts: IPostSchema[] = await PostService.getAllPost()
            res.json(posts)
        } catch (e) {
            next(e)
        }
    }
}

export default new PostController()