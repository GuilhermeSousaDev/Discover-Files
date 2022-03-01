import FindPaginateService from "@modules/files/services/FindPaginateService";
import ReadFileService from "@modules/files/services/ReadFileService";
import UploadFileService from "@modules/files/services/UploadFileService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class FilesController {
    public async index(req: Request, res: Response): Promise<Response> {
        const listFiles = container.resolve(FindPaginateService);

        const files = await listFiles.execute();

        return res.json(files);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const readFile = container.resolve(ReadFileService);

            const file = await readFile.execute({ id });

            return res.json(file);
        } catch (e) {
            return res.json(e);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, description, user } = req.body;
            const { originalname, buffer } = req.file;

            const uploadFile = container.resolve(UploadFileService);

            const file = await uploadFile.execute({ 
                name,  
                description,
                file: originalname,
                buffer,
                user,
            });

            return res.json(file);
        } catch (error) {
            console.log(error);
        }
    }
}