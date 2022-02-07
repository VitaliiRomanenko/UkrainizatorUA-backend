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

    async getAllUserMembers(userId: string): Promise<IMemberSchema[]> {
        return MemberModel.find({member: userId})
    }

    async getAllPostMembers(postId: string): Promise<IMemberSchema[]> {
        return MemberModel.find({post: postId})
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