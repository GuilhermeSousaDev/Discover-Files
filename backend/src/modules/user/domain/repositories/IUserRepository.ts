import { ICreateUser } from "../models/ICreateUser";
import { IUser } from "../models/IUser";

export interface IUserRepository {
    save(user: IUser): Promise<void>;
    remove(user: IUser): Promise<void>;
    create({ name, email, password }: ICreateUser): Promise<IUser>;
    find(): Promise<IUser[]>;
    findById(id: number): Promise<IUser>;
    findByEmail(email: string): Promise<IUser>;
}