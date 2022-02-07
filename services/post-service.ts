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

    async getPost(postId: string): Promise<PostDto>{
        const post: IPostSchema | null = await PostModel.findOne({_id: postId})
        if (!post){
            throw ApiError.BadRequest("Unknown post")
        }
        return new PostDto(post)
    }
}

export default new PostService()