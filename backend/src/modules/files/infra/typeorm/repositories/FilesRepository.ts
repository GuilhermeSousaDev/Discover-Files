import { ICreateFile } from "@modules/files/domain/models/ICreateFile";
import { IFiles } from "@modules/files/domain/models/IFiles";
import { IFilesRepository } from "@modules/files/domain/repositories/IFilesRepository";
import { getRepository, In, Like, Repository } from "typeorm";
import { Files } from "../entities/Files";

export class FilesRepository implements IFilesRepository {
    private ormRepository: Repository<Files>;

    constructor() {
        this.ormRepository = getRepository(Files);
    }

    public async create({ 
        name, 
        description, 
        file, 
        type, 
        category,
        user,
    }: ICreateFile): Promise<IFiles> {
        return this.ormRepository.create({ 
            name, 
            description,
            file,
            type,
            category,
            user,
        });
    }

    public async save(file: IFiles): Promise<IFiles> {
        return this.ormRepository.save(file);
    }

    public async remove(file: Files): Promise<IFiles> {
        return this.ormRepository.remove(file);
    }

    public async find(): Promise<IFiles[]> {
        return this.ormRepository.find({
            take: 100,
        });
    }

    public async findById(id: number): Promise<IFiles> {
        return this.ormRepository.findOne(id);
    }

    public async findFiles(name: string): Promise<IFiles[] | undefined> {
        return this.ormRepository.find({
            where: {
                name: Like(name),
            },
        });
    }

    public async findFilesByCategory(category: string): Promise<IFiles[]> {
        return this.ormRepository.find({
            where: {
                category,
            }
        });
    }
}