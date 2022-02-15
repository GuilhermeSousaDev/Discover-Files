import CreateSessionService from "@modules/user/services/CreateSessionService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class SessionController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const createSession = container.resolve(CreateSessionService);

        const session = await createSession.execute({ 
            email, 
            password,
        });

        return res.json(session);
    }
}