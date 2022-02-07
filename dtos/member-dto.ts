import {Types} from "mongoose";
import {IMember, IMemberSchema} from "../models/member-model";


export default class MemberDto implements IMember{
    public id: string
    public post: Types.ObjectId
    public user: Types.ObjectId

    constructor(model:IMemberSchema) {
        this.post = model.post
        this.id = model._id
        this.user = model.user
    }
}