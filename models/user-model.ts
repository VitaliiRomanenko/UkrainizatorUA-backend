import mongoose, {Schema, Document} from "mongoose"

export type Role = "user" | "moderator" | "admin"

export interface IUser extends Document{
    email: string,
    password: string,
    isActivated: boolean,
    activationLink?: string,
    role: Role
}

const UserSchema: Schema = new Schema<IUser>({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    role: {type: String, required: true, default: "user"}
})

export default mongoose.model<IUser>('User', UserSchema);
