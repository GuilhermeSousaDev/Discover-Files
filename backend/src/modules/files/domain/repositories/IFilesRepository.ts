import { ICreateFile } from "../models/ICreateFile";
import { IFiles } from "../models/IFiles";

export interface IFilesRepository {
    save(file: IFiles): Promise<IFiles>;
    remove(file: IFiles): Promise<void>;
    create({ name, description, type, file }: ICreateFile): Promise<IFiles>;
    find(): Promise<IFiles[]>;  
    findById(id: number): Promise<IFiles>;
    findFiles(name: string): Promise<IFiles[]>;
    findFilesByCategory(category: string): Promise<IFiles[]>;
    findFilesByUser(userId: number): Promise<IFiles[]>;
    findFilesByType(type: string): Promise<IFiles[]>;
}