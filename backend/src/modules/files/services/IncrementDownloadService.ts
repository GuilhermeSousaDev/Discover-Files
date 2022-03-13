import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IFiles } from "../domain/models/IFiles";
import { IFilesRepository } from "../domain/repositories/IFilesRepository";

interface IRequest {
    download: number;
    file_id: number;
}

@injectable()
export default class IncrementDownloadService {
    constructor(
        @inject('fileRepository')
        private fileRepository: IFilesRepository,
    ) {}

    public async execute({ download, file_id }: IRequest): Promise<IFiles> {
        const file = await this.fileRepository.findById(file_id);

        if(!file) {
            throw new AppError('File not found');
        }

        file.downloads += download;

        await this.fileRepository.save(file);

        return file;
    }
}