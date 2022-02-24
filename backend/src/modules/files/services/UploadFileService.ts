import fs from 'fs';
import crypto from 'crypto';
import AppError from '@shared/errors/AppError';
import { ICreateFile } from '@modules/files/domain/models/ICreateFile';
import { inject, injectable } from 'tsyringe';
import { IFilesRepository } from '../domain/repositories/IFilesRepository';
import { IFiles } from '../domain/models/IFiles';

@injectable()
export default class UploadFileService {
    constructor(
        @inject('filesRepository')
        private filesRepository: IFilesRepository,
    ) {}

    public async execute({ 
        name, 
        file, 
        buffer, 
        description, 
        user,
    }: ICreateFile): Promise<IFiles> {
        if(!file.includes('.')) {
            throw new AppError('The file not have a explicity type: ex: png, pdf, csv');
        } 

        const size = fs.statSync(buffer).size;
        const [, typeFile] = file.split('.');
        
        const randomBytes = crypto.randomBytes(10);
        const path = `${randomBytes}-${file}`;
        
        fs.createReadStream(buffer)
        .pipe(fs.createWriteStream(`uploads/${path}`));
        
        const newFile = await this.filesRepository.create({
            name,
            description,
            file: path,
            type: typeFile,
            size,
            user,
        });

        return newFile;
    }
}