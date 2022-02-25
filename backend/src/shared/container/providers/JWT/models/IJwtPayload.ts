import { JwtPayload } from "jsonwebtoken";

export interface IJwtPayload {
    verifiedToken: string | JwtPayload;
    token: string;
}