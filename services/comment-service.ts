import CommentModel, {ICommentSchema} from "../models/comment-model";
import CommentDto from "../dtos/comment-dto";


class CommentService {

    async addComment(post: string, user: string, text: string): Promise<CommentDto> {
        const comment: ICommentSchema = await CommentModel.create({post, user, text})
        return new CommentDto(comment)
    }

    async getAllUserComments(userId: string): Promise<CommentDto[]> {
        const result: ICommentSchema[] = await CommentModel.find({user: userId})
        return result.map(item => new CommentDto(item))
    }

    async getAllPostComments(postId: string): Promise<CommentDto[]> {
        const result: ICommentSchema[] = await CommentModel.find({post: postId})
        return result.map(item => new CommentDto(item))
    }


}

export default new CommentService()