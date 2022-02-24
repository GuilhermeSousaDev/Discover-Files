import { ICreateFile } from "@modules/files/domain/models/ICreateFile";
import { IFiles } from "@modules/files/domain/models/IFiles";
import { IFilesRepository } from "@modules/files/domain/repositories/IFilesRepository";
import { getRepository, Like, Repository } from "typeorm";
import { Files } from "../entities/Files";

export class FilesRepository implements IFilesRepository {
    private ormRepository: Repository<Files>;

    constructor() {
        this.ormRepository = getRepository(Files);
    }

    public async create({ name, file, size, type, description, user }: ICreateFile): Promise<IFiles> {
        const newFile = this.ormRepository.create({ 
            name, 
            description,
            file,
            size,
            type,
            user,
        });

        return newFile;
    }

    public async save(file: IFiles): Promise<void> {
        this.ormRepository.save(file);
    }

    public async remove(file: IFiles): Promise<void> {
        this.ormRepository.delete(file);
    }

    public async find(): Promise<IFiles[]> {
        return this.ormRepository.find();
    }

    public async findFile(name: string): Promise<IFiles[] | undefined> {
        return this.ormRepository.find({
            where: {
                name: Like(name),
            },
        });
    }

    public async findFileByPath(path: string): Promise<IFiles[]> {
        return this.ormRepository.find({
            where: {
                file: path,
            },
        });
    }
}