import { Request, Response } from "express";
import { container } from "tsyringe";
import ListFilesByCategoryService from "@modules/files/services/ListFilesByCategoryService";

export default class FilesByCategoryController {
    public async index(req: Request, res: Response): Promise<Response> {
        const { category } = req.params;

        const listFiles = container.resolve(ListFilesByCategoryService);

        const files = await listFiles.execute(category);

        return res.json(files);
    }
}