import ListFileByNameService from "@modules/files/services/ListFileByNameService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ListFileByNameController {
    public async index(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;

        const findFiles = container.resolve(ListFileByNameService);

        const files = findFiles.execute(name);

        return res.json(files);
    }
}