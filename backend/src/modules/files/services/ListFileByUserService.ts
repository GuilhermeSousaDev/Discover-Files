import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IFiles } from "../domain/models/IFiles";
import { IFilesRepository } from "../domain/repositories/IFilesRepository";

@injectable()
export default class ListFilesByUserService {
    constructor(
        @inject('fileRepository')
        private fileRepository: IFilesRepository,
    ) {}

    public async execute(userId: number): Promise<IFiles[]> {
        const userFiles = await this.fileRepository
            .findFilesByUser(userId);

        if(!userFiles) {
            throw new AppError('This user not have posted files');
        }

        return userFiles;
    }
}