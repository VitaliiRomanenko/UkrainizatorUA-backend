import mongoose, {Schema, Document} from "mongoose"

export interface IUser extends Document{
    email: string,
    password: string,
    isActivated: boolean,
    activationLink?: string
}

const UserSchema: Schema = new Schema<IUser>({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String}
})

export default mongoose.model<IUser>('User', UserSchema);
