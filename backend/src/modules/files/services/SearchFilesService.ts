import { inject, injectable } from "tsyringe";
import { IFiles } from "../domain/models/IFiles";
import { IFilesRepository } from "../domain/repositories/IFilesRepository";

@injectable()
export default class SearchFilesService {
    constructor(
        @inject('fileRepository')
        private fileRepository: IFilesRepository,
    ) {}

    public async execute(name: string): Promise<IFiles[] | undefined> {
        const files = await this.fileRepository.findFiles(name);

        return files;
    }
}