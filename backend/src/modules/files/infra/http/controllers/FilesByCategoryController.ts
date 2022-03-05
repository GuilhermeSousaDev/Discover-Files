import { Request, Response } from "express";
import { container } from "tsyringe";
import ListFilesByCategory from "@modules/files/services/ListFilesByCategory";

export default class FilesByCategoryController {
    public async index(req: Request, res: Response): Promise<Response> {
        const { category } = req.params;

        const listFiles = container.resolve(ListFilesByCategory);

        const files = await listFiles.execute(category);

        return res.json(files);
    }
}