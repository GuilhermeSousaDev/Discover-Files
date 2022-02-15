import { IUser } from "./IUser";

export interface IPayload {
    user: IUser;
    token: string;
}