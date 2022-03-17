import { inject, injectable } from "tsyringe";
import { IFiles } from "../domain/models/IFiles";
import { IFilesRepository } from "../domain/repositories/IFilesRepository";

@injectable()
export default class ListFilesByTypeService {
    constructor(
        @inject('fileRepository')
        private fileRepository: IFilesRepository,
    ) {}

    public async execute(type: string): Promise<IFiles[]> {
        const files = await this.fileRepository.findFilesByType(type);

        return files;
    }
}