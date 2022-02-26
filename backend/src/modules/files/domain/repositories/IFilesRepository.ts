import { ICreateFile } from "../models/ICreateFile";
import { IFiles } from "../models/IFiles";

export interface IFilesRepository {
    save(file: IFiles): Promise<IFiles>;
    remove(file: IFiles): Promise<void>
    create({ name, file, type, description }: ICreateFile): Promise<IFiles>;
    find(): Promise<IFiles[]>;  
    findById(id: string): Promise<IFiles>;
    findFiles(name: string): Promise<IFiles[]>;
    findPaginate(): Promise<IFiles[]>;
}