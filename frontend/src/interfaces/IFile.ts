import { IUser } from "./IUser"

export interface IFile {
    id: number
    name: string
    description: string
    type: string
    file: string
    downloads: number;
    user: IUser;
    createdAt: Date;
    updatedAt: Date;
    size: number;
}