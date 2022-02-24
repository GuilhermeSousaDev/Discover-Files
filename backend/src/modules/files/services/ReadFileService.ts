import fs from 'fs'; 
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IFilesRepository } from '../domain/repositories/IFilesRepository';
import { IFiles } from '../domain/models/IFiles';

interface IResponse {
    file: IFiles[];
    data?: string;
    image?: string;
}

interface IRequest {
    filename: string;
}

@injectable()
export default class ReadFileService {
    constructor(
        @inject('fileRepository')
        private fileRepository: IFilesRepository,
    ) {}
    
    public async execute({ filename }: IRequest): Promise<IResponse> {
        const path = `uploads/${filename}`;

        const file = await this.fileRepository.findFileByPath(filename);

        if(!file) {
            throw new AppError('File not found');
        }

        const filePathExists = fs.statSync(path);

        if(!filePathExists) {
            throw new AppError('File not found');
        }

        const [, typeFile] = filename.split('.');

        const imgTypes = ['png', 'jpg', 'jpeg'];

        imgTypes.map(types => {
            if(typeFile === types) {
                return {
                    file,
                    image: `http://localhost:8081/files/${filename}`,
                };
            }
        });

        const contentFile = fs.readFileSync(
            `uploads/${filename}`, 
            { encoding: 'utf-8' },
        );

        return {
            file,
            data: contentFile,
        };
    }
}