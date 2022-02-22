import fs from 'fs'; 
import AppError from '@shared/errors/AppError';

interface IResponse {
    data?: string;
    image?: string;
}

export default class ReadFileService {
    public execute(filename: string): IResponse {
        const path = `uploads/${filename}`;

        const fileExists = fs.statSync(path);

        if(!fileExists) {
            throw new AppError('File not found');
        }

        const [, typeFile] = filename.split('.');

        const imgTypes = ['png', 'jpg', 'jpeg'];

        imgTypes.map(types => {
            if(typeFile === types) {
                return {
                    image: `http://localhost:8081/files/${filename}`,
                };
            }
        });

        const contentFile = fs.readFileSync(
            `uploads/${filename}`, 
            { encoding: 'utf-8' },
        );

        return {
            data: contentFile,
        };
    }
}