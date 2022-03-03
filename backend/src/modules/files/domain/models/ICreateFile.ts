import { IUser } from "@modules/user/domain/models/IUser";

export interface ICreateFile {
    name: string;
    description: string;
    file: string;
    user: IUser;
    category: string;
    size?: number;
    buffer?: Buffer;
    type?: string;
}