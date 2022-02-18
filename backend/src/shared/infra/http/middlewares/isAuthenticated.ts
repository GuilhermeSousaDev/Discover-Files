import AppError from "@shared/errors/AppError";
import { auth } from "@config/auth";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IUserPayload {
    id: string;
    name: string;
    avatar: string;
}

export default function isAuthenticated(
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    const token = req.headers.authorization;

    if(!token) {
        throw new AppError('Token not Found');
    }

    try {
        const { id, name, avatar } = verify(token, auth.secret) as IUserPayload;

        req.user = {
            id,
            name,
            avatar,
        };

        next();
    } catch (error) {
        throw new AppError('Invalid Token');
    }
}