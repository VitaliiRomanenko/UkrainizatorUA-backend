import ApiError from "../exceptions/api-error";
import MemberModel, {IMemberSchema} from "../models/member-model";
import MemberDto from "../dtos/member-dto";
import {DeleteResult} from "mongodb";


class MemberService {

    async addMember(post: string, user: string): Promise<MemberDto> {
        const candidate: IMemberSchema | null = await MemberModel.findOne({post, user})
        if (candidate) {
            throw ApiError.BadRequest(`User is already a member of the post`)
        }
        const member: IMemberSchema = await MemberModel.create({post, user})
        return new MemberDto(member)
    }

    async getAllUserMembers(userId: string): Promise<MemberDto[]> {
        const result: IMemberSchema[] = await MemberModel.find({member: userId})
        return result.map(item => new MemberDto(item))
    }

    async getAllPostMembers(postId: string): Promise<MemberDto[]> {
        const result: IMemberSchema[] = await MemberModel.find({post: postId})
        return result.map(item => new MemberDto(item))
    }

    async leave(post: string, user: string): Promise<DeleteResult> {
        const candidate: IMemberSchema | null = await MemberModel.findOne({post, user})
        if (!candidate) {
            throw ApiError.BadRequest(`User is not member of the post`)
        }
        return MemberModel.deleteOne({post: candidate.post._id, user: candidate.user._id});

    }

}

export default new MemberService()