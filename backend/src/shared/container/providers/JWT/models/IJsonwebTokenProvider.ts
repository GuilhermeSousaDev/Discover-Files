import { ICreateToken } from "./ICreateToken";

export interface IJsonWebTokenProvider {
    generateToken({ id, name, avatar }: ICreateToken): string;
}