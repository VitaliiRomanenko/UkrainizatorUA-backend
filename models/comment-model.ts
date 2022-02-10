import mongoose, {Schema, Document, Types} from "mongoose"

export interface IComment{
    post: Types.ObjectId,
    user: Types.ObjectId,
    text: string
}

export interface ICommentSchema extends IComment, Document{

}

const CommentSchema:Schema = new Schema<ICommentSchema>({
    post: {type: Schema.Types.ObjectId,  required: true, ref: 'Post'},
    user: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    text: {type: String, required: true}
})


export default mongoose.model<ICommentSchema>("Comment", CommentSchema)