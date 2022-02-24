import ReadFileService from "@modules/files/services/ReadFileService";
import UploadFileService from "@modules/files/services/UploadFileService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class FilesController {
    public async index(req: Request, res: Response): Promise<Response> {
        const { filename } = req.params;

        const readFile = container.resolve(ReadFileService);

        const file = readFile.execute({ filename });

        return res.json(file);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, description, user } = req.body;
        const { originalname, buffer } = req.file;

        const uploadFile = container.resolve(UploadFileService);

        const file = uploadFile.execute({ 
            name,  
            description,
            file: originalname,
            buffer,
            user,
        });

        return res.json(file);
    }
}