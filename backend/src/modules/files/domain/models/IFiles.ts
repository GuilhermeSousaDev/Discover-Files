import { IUser } from "@modules/user/domain/models/IUser";

export interface IFiles {
    id: number;
    name: string;
    description: string;
    file: string;
    type: string;
    user: IUser;
    createdAt: Date;
    updatedAt: Date;
}