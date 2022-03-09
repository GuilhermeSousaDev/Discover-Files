import ListFilesByUserService from "@modules/files/services/ListFileByUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ListFilesByUserController {
    public async index(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const listFilesByUser = container.resolve(ListFilesByUserService);

        const userFiles = await listFilesByUser.execute(Number(id));

        return res.json(userFiles);
    }
}