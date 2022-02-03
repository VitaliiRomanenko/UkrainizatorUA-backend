import {Types} from "mongoose";
import {IPost, IPostSchema} from "../models/post-model";

export default class PostDto implements IPost{
    public category: Types.ObjectId
    public createdDate: string | undefined
    public description: string
    public header: string
    public language: Types.ObjectId
    public link: string
    public photo: string | undefined
    public author: Types.ObjectId
    public id: string

    constructor(model:IPostSchema) {
        this.category = model.category
        this.id = model._id
        this.author = model.author
        this.createdDate = model.createdDate
        this.description = model.description
        this.header = model.header
        this.language = model.language
        this.link = model.link
        this.photo = model.photo
    }
}