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
        return this.ormRepository.create({ 
            name, 
            description,
            file,
            size,
            type,
            user,
        });
    }

    public async save(file: IFiles): Promise<IFiles> {
        return this.ormRepository.save(file);
    }

    public async remove(file: IFiles): Promise<void> {
        this.ormRepository.delete(file);
    }

    public async find(): Promise<IFiles[]> {
        return this.ormRepository.find();
    }

    public async findById(id: string): Promise<IFiles> {
        return this.ormRepository.findOne(id);
    }

    public async findFiles(name: string): Promise<IFiles[] | undefined> {
        return this.ormRepository.find({
            where: {
                name: Like(name),
            },
            relations: ['user'],
        });
    }

    public async findPaginate(): Promise<IFiles[]> {
        return this.ormRepository.find({
            take: 100,
            relations: ['user'],
        });
    }
}