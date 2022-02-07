import mongoose, {Schema, Document, Types} from "mongoose"

export interface IMember{
    post: Types.ObjectId,
    user: Types.ObjectId
}

export interface IMemberSchema extends IMember, Document{

}

const MemberSchema:Schema = new Schema<IMemberSchema>({
    post: {type: Schema.Types.ObjectId,  required: true, ref: 'Post'},
    user: {type: Schema.Types.ObjectId, required: true, ref: 'User'}
})


export default mongoose.model<IMemberSchema>("Member", MemberSchema)