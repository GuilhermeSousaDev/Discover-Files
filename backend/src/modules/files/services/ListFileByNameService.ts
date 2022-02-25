import { inject, injectable } from "tsyringe";
import { IFiles } from "../domain/models/IFiles";
import { IFilesRepository } from "../domain/repositories/IFilesRepository";

@injectable()
export default class ListFileByNameService {
    constructor(
        @inject('filesRepository')
        private fileRepository: IFilesRepository,
    ) {}

    public async execute(name: string): Promise<IFiles[] | undefined> {
        const files = await this.fileRepository.findFiles(name);

        return files;
    }
}