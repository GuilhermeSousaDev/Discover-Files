import SearchFileService from "@modules/files/services/SearchFilesService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class SearchFilesController {
    public async index(req: Request, res: Response): Promise<Response> {
        const { name } = req.params;

        const findFiles = container.resolve(SearchFileService);

        const files = await findFiles.execute(name);

        return res.json(files);
    }
}