import VerifyTokenService from "@modules/user/services/VerifyTokenService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class TokenController {
    public async index(req: Request, res: Response): Promise<Response> {
        const token = req.headers.authorization;

        const verifyTokenService = container.resolve(VerifyTokenService);

        const verifyToken = verifyTokenService.execute(token);

        return res.json(verifyToken);
    }
}