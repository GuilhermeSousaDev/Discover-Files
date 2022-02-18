import { ICreateFile } from "../models/ICreateFile";
import { IFiles } from "../models/IFiles";

export interface IFilesRepository {
    create({ name, file }: ICreateFile): Promise<IFiles>;
    save(file: IFiles): Promise<void>;
    remove(file: IFiles): Promise<void>
}