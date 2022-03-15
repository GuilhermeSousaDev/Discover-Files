import { IUser } from "./IUser";

export interface IDownload {
    file: {
        id: number
        name: string
        description: string
        category: string;
        type: string
        file: string
        downloads: number;
        user: IUser;
        createdAt: Date;
        updatedAt: Date;
    }
    size: string;
}