import mongoose, {Schema, Document, Types} from "mongoose"

export interface ICategory extends Document{
    name: string,
    author: Types.ObjectId
}

const CategorySchema:Schema = new Schema<ICategory>({
    name: {type: String,  required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User'}
})


export default mongoose.model<ICategory>("Category", CategorySchema)