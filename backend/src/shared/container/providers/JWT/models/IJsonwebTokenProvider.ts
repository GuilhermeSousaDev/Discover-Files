import { JwtPayload } from "jsonwebtoken";
import { ICreateToken } from "./ICreateToken";

export interface IJsonWebTokenProvider {
    generateToken({ id, name, avatar }: ICreateToken): string;
    verifyToken(token: string): string | JwtPayload;
}