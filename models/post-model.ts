import mongoose, {Schema, Document, Types} from "mongoose"

export interface IPost{
    header: string,
    description: string,
    category: Types.ObjectId,
    language: Types.ObjectId,
    author: Types.ObjectId,
    photo?: string,
    link: string,
    createdDate?: string
}

export interface IPostSchema extends IPost, Document{

}

const PostSchema:Schema = new Schema<IPostSchema>({
    category: {type: Schema.Types.ObjectId, ref: "Category", required: true},
    createdDate: {type: String, default: Date.now().toString()},
    description: {type: String, required: true},
    header: {type: String, required: true},
    language: {type: Schema.Types.ObjectId, ref: "Language", required: true},
    link: {type: String, required: true},
    photo: {type: String,  default: "default photo"},
    author: {type: Schema.Types.ObjectId, required:true, ref: 'User'}
})


export default mongoose.model<IPostSchema>("Post", PostSchema)