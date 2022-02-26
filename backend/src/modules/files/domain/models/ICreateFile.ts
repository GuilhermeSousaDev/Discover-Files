import { User } from "@modules/user/infra/typeorm/entities/User";

export interface ICreateFile {
    name: string;
    description: string;
    file: string;
    user: User;
    buffer?: Buffer;
    type?: string;
}