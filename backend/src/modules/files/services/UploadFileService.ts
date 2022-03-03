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
        @inject('fileRepository')
        private filesRepository: IFilesRepository,
    ) {}

    public async execute({ 
        name, 
        file, 
        buffer, 
        description, 
        category,
        user,
    }: ICreateFile): Promise<IFiles> {
        if(!file.includes('.')) {
            throw new AppError('The file not have a explicity type: ex: png, pdf, csv');
        } 

        const [, typeFile] = file.split('.');
        
        const hash = crypto.randomBytes(10).toString('hex');

        const filenameHash = `${hash}-${file}`;
        
        const createFile = fs.createWriteStream(`uploads/${filenameHash}`);
        
        createFile.write(buffer);

        const size = fs.statSync(`uploads/${filenameHash}`).size;
        
        const newFile = await this.filesRepository.create({
            name,
            description,
            file: filenameHash,
            type: typeFile,
            category,
            size,
            user,
        });

        await this.filesRepository.save(newFile);

        return newFile;
    }
}