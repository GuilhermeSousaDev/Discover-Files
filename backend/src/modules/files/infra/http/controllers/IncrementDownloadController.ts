import IncrementDownloadService from "@modules/files/services/IncrementDownloadService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class IncrementDownloadController {
    public async index(req: Request, res: Response): Promise<Response> {
        const { file_id } = req.body;

        const incrementDownload = container.resolve(IncrementDownloadService);

        const file = await incrementDownload.execute({ 
            file_id,
            download: 1,
        });

        return res.json(file);
    }
}