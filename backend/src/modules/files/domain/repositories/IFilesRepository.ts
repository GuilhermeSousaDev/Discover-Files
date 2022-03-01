import { ICreateFile } from "../models/ICreateFile";
import { IFiles } from "../models/IFiles";

export interface IFilesRepository {
    save(file: IFiles): Promise<IFiles>;
    remove(file: IFiles): Promise<IFiles>
    create({ name, file, type, description }: ICreateFile): Promise<IFiles>;
    find(): Promise<IFiles[]>;  
    findById(id: number): Promise<IFiles>;
    findFiles(name: string): Promise<IFiles[]>;
    findPaginate(): Promise<IFiles[]>;
}