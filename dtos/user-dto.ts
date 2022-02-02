import {IUser, Role} from "../models/user-model";

export interface IUserDto {
    email: string,
    id: string,
    isActivated: boolean,
    role: Role
}

export default class UserDto implements IUserDto{
    public email: string
    public id: string
    public isActivated: boolean
    public role: Role

    constructor(model:IUser) {
        this.email = model.email
        this.id = model._id
        this.isActivated = model.isActivated
        this.role = model.role
    }
}