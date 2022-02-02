import {IUser, Role} from "../models/user-model";

export interface IUserDto {
    email: string,
    id: string,
    isActivated: boolean,
    role: Role,
    avatar: string,
    createdDate: string
}

export default class UserDto implements IUserDto {
    public email: string
    public id: string
    public isActivated: boolean
    public role: Role
    public avatar: string
    public createdDate: string

    constructor(model: IUser) {
        this.email = model.email
        this.id = model._id
        this.isActivated = model.isActivated
        this.role = model.role
        this.avatar = model.avatar
        this.createdDate = model.createdDate
    }
}