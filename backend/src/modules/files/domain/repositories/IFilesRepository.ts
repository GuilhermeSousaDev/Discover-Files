import { ICreateFile } from "../models/ICreateFile";
import { IFiles } from "../models/IFiles";

export interface IFilesRepository {
    find(): Promise<IFiles[]>;  
    findFile(name: string): Promise<IFiles[]>
    create({ name, file, type, description }: ICreateFile): Promise<IFiles>;
    save(file: IFiles): Promise<void>;
    remove(file: IFiles): Promise<void>
}