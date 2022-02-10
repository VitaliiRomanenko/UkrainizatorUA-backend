import {Types} from "mongoose";
import {IComment, ICommentSchema} from "../models/comment-model";


export default class CommentDto implements IComment{
    public id: string
    public post: Types.ObjectId
    public user: Types.ObjectId
    public text: string

    constructor(model:ICommentSchema) {
        this.post = model.post
        this.id = model._id
        this.user = model.user
        this.text = model.text
    }
}