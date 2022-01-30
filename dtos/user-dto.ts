import {IUser} from "../models/user-model";

export interface IUserDto {
    email: string,
    id: string,
    isActivated: boolean
}

export default class UserDto implements IUserDto{
    public email: string
    public id: string
    public isActivated: boolean

    constructor(model:IUser) {
        this.email = model.email
        this.id = model._id
        this.isActivated = model.isActivated
    }
}