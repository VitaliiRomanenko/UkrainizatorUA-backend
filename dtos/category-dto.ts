import {ICategory} from "../models/category-model";
import {Types} from "mongoose";

export interface ICategoryDto {
    id: string,
    name: string,
    author: Types.ObjectId
}

export default class CategoryDto implements ICategoryDto{
    public id: string
    public name: string
    public author: Types.ObjectId

    constructor(model:ICategory) {
        this.name = model.name
        this.id = model._id
        this.author = model.author
    }
}