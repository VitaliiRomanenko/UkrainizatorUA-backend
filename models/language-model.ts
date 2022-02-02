import mongoose, {Schema, Document, Types} from "mongoose"

export interface ILanguage extends Document{
    name: string,
    author: Types.ObjectId
}

const LanguageSchema:Schema = new Schema<ILanguage>({
    name: {type: String,  required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User'}
})


export default mongoose.model<ILanguage>("Language", LanguageSchema)