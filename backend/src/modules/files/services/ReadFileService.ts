import fs from 'fs'; 
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IFilesRepository } from '../domain/repositories/IFilesRepository';
import { IFiles } from '../domain/models/IFiles';

interface IResponse {
    file: IFiles;
    contentFile: string;
}

interface IRequest {
    id: string;
}

@injectable()
export default class ReadFileService {
    constructor(
        @inject('fileRepository')
        private fileRepository: IFilesRepository,
    ) {}
    
    public async execute({ id }: IRequest): Promise<IResponse> {
        const file = await this.fileRepository.findById(Number(id));
        
        const path = `uploads/${file.file}`;

        if(!file) {
            throw new AppError('File not found');
        }

        const filePathExists = fs.statSync(path);

        if(!filePathExists) {
            throw new AppError('File not found on directory');
        }

        const imgTypes = ['png', 'jpg', 'jpeg'];

        const isImage = imgTypes.map(type => {
            if(file.type === type) {
                return true;
            } else {
                return false;
            }
        });

        const contentFile = fs.readFileSync(
            `uploads/${file.file}`, 
            { encoding: 'utf-8' },
        );

        return {
            file,
            contentFile,
        };
    }
}