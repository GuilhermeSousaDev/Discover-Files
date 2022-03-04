import fs from 'fs'; 
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IFilesRepository } from '../domain/repositories/IFilesRepository';
import { IFiles } from '../domain/models/IFiles';

interface IResponse {
    file: IFiles;
    size: number;
}

@injectable()
export default class ShowFileService {
    constructor(
        @inject('fileRepository')
        private fileRepository: IFilesRepository,
    ) {}
    
    public async execute(id: number): Promise<IResponse> {
        const file = await this.fileRepository.findById(id);

        if(!file) {
            throw new AppError('File not found');
        }

        const filePathExists = fs.statSync(`uploads/${file.file}`);

        if(!filePathExists) {
            throw new AppError('File not found on directory');
        }

        let size: any = filePathExists.size;

        if(size < 1024) {
            size = `${size}Bytes`;
        } else if (size < 1048567) {
            size = `${(size / 1024).toFixed(1)}Kb`
        } else if(size < 1073741824) {
            size = `${(size / 1048567).toFixed(1)}Mb`;
        } else {
            size = `${(size / 1073741824).toFixed(1)}GB`;
        }

        return {
            file,
            size,
        };
    }
}