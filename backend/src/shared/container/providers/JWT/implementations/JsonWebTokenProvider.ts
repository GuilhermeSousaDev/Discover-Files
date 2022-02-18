import { auth } from "@config/auth";
import { sign } from "jsonwebtoken";
import { ICreateToken } from "../models/ICreateToken";

export class JsonWebTokenProvider {
    public generateToken({ id, name, avatar }: ICreateToken): string {
        const token = sign({
            id,
            name,
            avatar,
        }, auth.secret, { expiresIn: auth.expires });

        return token;
    }
}