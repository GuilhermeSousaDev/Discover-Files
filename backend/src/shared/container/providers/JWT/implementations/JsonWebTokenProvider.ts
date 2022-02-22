import { auth } from "@config/auth";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { ICreateToken } from "../models/ICreateToken";
import { IJsonWebTokenProvider } from "../models/IJsonwebTokenProvider";

export class JsonWebTokenProvider implements IJsonWebTokenProvider {
    public verifyToken(token: string): string | JwtPayload {
        return verify(token, auth.secret);
    }
    public generateToken({ id, name, avatar }: ICreateToken): string {
        const token = sign({
            id,
            name,
            avatar,
        }, auth.secret, { expiresIn: auth.expires });

        return token;
    }
}