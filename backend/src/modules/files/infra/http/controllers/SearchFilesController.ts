import ListFilesByCategory from "@modules/files/services/ListFilesByCategory";
import SearchFileService from "@modules/files/services/SearchFilesService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class SearchFilesController {
    public async index(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;

        const findFiles = container.resolve(SearchFileService);

        const files = findFiles.execute(name);

        return res.json(files);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const { category } = req.params;

        const findFiles = container.resolve(ListFilesByCategory);

        const files = findFiles.execute(category);

        return res.json(files);
    }
}