import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IFilesRepository } from "../domain/repositories/IFilesRepository";

@injectable()
export default class DeleteFileService {
    constructor(
        @inject('fileRepository')
        private fileRepository: IFilesRepository,
    ) {}

    public async execute(id: number): Promise<void> {
        const file = await this.fileRepository.findById(id);

        if(!file) {
            throw new AppError('File not found');
        }

        await this.fileRepository.remove(file);
    }
}