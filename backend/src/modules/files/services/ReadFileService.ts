import fs from 'fs'; 
import AppError from '@shared/errors/AppError';

export default class ReadFileService {
    public execute(filename: string): string {
        const path = `uploads/${filename}`;

        const fileExists = fs.statSync(path);

        if(!fileExists) {
            throw new AppError('File not found');
        }

        const contentFile = fs.readFileSync(
            `uploads/${filename}`, 
            { encoding: 'utf-8' },
        );

        return contentFile;
    }
}