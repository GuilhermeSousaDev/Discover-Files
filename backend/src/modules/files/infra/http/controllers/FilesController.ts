import ListFilesService from "@modules/files/services/ListFilesService";
import ShowFileService from "@modules/files/services/ShowFileService";
import UploadFileService from "@modules/files/services/UploadFileService";
import DeleteFileService from "@modules/files/services/DeleteFileService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class FilesController {
    public async index(req: Request, res: Response): Promise<Response> {
        const listFiles = container.resolve(ListFilesService);

        const files = await listFiles.execute();

        return res.json(files);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const showFile = container.resolve(ShowFileService);

        const file = await showFile.execute(Number(id));

        return res.json(file);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, description, category, user } = req.body;
        const { originalname, buffer } = req.file;

        const uploadFile = container.resolve(UploadFileService);

        const file = await uploadFile.execute({ 
            name,  
            description,
            category,
            user,
            buffer,
            file: originalname,
        });

        return res.json(file); 
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteFile = container.resolve(DeleteFileService);

        await deleteFile.execute(Number(id));

        return res.json('Deletado com Sucesso!');
    }
}