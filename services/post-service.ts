import ApiError from "../exceptions/api-error";
import PostModel, {IPost, IPostSchema} from "../models/post-model";
import PostDto from "../dtos/post-dto";


class PostService {

    async createPost(post: IPost): Promise<PostDto> {
        const candidate: IPostSchema | null = await PostModel.findOne({header: post.header})
        if (candidate) {
            throw ApiError.BadRequest(`Post: ${post.header} is already exist`)
        }

        const newPost: IPostSchema = await PostModel.create({...post})
        return new PostDto(newPost)
    }
    async getAllPost(): Promise<IPostSchema[]> {
        return PostModel.find()
    }

}

export default new PostService()