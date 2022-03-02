import { inject, injectable } from "tsyringe";
import { IFiles } from "../domain/models/IFiles";
import { IFilesRepository } from "../domain/repositories/IFilesRepository";

@injectable()
export default class ListFilesService {
    constructor(
        @inject('fileRepository')
        private fileRepository: IFilesRepository,
    ) {}

    public async execute(): Promise<IFiles[]> {
        const files = await this.fileRepository.find();

        return files;
    }
}