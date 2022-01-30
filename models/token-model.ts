import mongoose, {Schema, Document, Types} from "mongoose"

export interface IToken extends Document{
    user: Types.ObjectId,
    refreshToken: string,
}

const TokenSchema:Schema = new Schema<IToken>({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String,  required: true}
})


export default mongoose.model<IToken>("Token", TokenSchema)