import fs from 'fs'; 
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IFilesRepository } from '../domain/repositories/IFilesRepository';
import { IFiles } from '../domain/models/IFiles';

@injectable()
export default class ShowFileService {
    constructor(
        @inject('fileRepository')
        private fileRepository: IFilesRepository,
    ) {}
    
    public async execute(id: number): Promise<IFiles> {
        const file = await this.fileRepository.findById(id);

        if(!file) {
            throw new AppError('File not found');
        }

        const filePathExists = fs.statSync(`uploads/${file.file}`);

        if(!filePathExists) {
            throw new AppError('File not found on directory');
        }

        return file;
    }
}