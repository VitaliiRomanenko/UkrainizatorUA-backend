import {Types} from "mongoose";
import {ILanguage} from "../models/language-model";

export interface ILanguageDto {
    id: string,
    name: string,
    author: Types.ObjectId
}

export default class LanguageDto implements ILanguageDto{
    public id: string
    public name: string
    public author: Types.ObjectId

    constructor(model:ILanguage) {
        this.name = model.name
        this.id = model._id
        this.author = model.author
    }
}