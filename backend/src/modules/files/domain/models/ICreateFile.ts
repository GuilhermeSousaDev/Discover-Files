import { User } from "@modules/user/infra/typeorm/entities/User";

export interface ICreateFile {
    name: string;
    description: string;
    file: string;
    user: User;
    size?: number;
    buffer?: Buffer;
    type?: string;
}