import ListFilesByTypeService from "@modules/files/services/ListFilesByTypeService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ListFilesByTypeController {
    public async index(req: Request, res: Response): Promise<Response> {
        const { type } = req.params;

        const listFilesByType = container.resolve(ListFilesByTypeService);

        const files = await listFilesByType.execute(type);

        return res.json(files);
    }
}