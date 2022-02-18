import { ICreateFile } from "@modules/files/domain/models/ICreateFile";
import { IFiles } from "@modules/files/domain/models/IFiles";
import { IFilesRepository } from "@modules/files/domain/repositories/IFilesRepository";
import { getRepository, Repository } from "typeorm";
import { Files } from "../entities/Files";

export class FilesRepository implements IFilesRepository {
    private ormRepository: Repository<Files>;

    constructor() {
        this.ormRepository = getRepository(Files);
    }

    public async create({ name, file }: ICreateFile): Promise<IFiles> {
        const newFile = this.ormRepository.create({ name, file });

        return newFile;
    }

    public async save(file: IFiles): Promise<void> {
        this.ormRepository.save(file);
    }

    public async remove(file: IFiles): Promise<void> {
        this.ormRepository.remove(file);
    }

    public async find(): Promise<IFiles[]> {
        return this.ormRepository.find();
    }
}