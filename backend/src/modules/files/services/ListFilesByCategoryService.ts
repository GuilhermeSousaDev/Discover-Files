import { inject, injectable } from "tsyringe";
import { IFiles } from "../domain/models/IFiles";
import { IFilesRepository } from "../domain/repositories/IFilesRepository";

@injectable()
export default class ListFilesByCategoryService {
    constructor(
        @inject('fileRepository')
        private fileRepository: IFilesRepository,
    ) {}

    public async execute(category: string): Promise<IFiles[]> {
        const files = await this.fileRepository
            .findFilesByCategory(category);

        return files;
    }
}