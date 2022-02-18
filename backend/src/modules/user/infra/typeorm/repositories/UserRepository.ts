import { ICreateUser } from "@modules/user/domain/models/ICreateUser";
import { IUser } from "@modules/user/domain/models/IUser";
import { IUserRepository } from "@modules/user/domain/repositories/IUserRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";

export class UserRepository implements IUserRepository {
    private ormRepository: Repository<User>;
    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async save(user: IUser): Promise<void> {
        this.ormRepository.save(user);
    }

    public async remove(user: IUser): Promise<void> {
        this.ormRepository.remove(user);
    }

    public async create({ name, email, password }: ICreateUser): Promise<IUser> {
        const user = this.ormRepository.create({
            name,
            email,
            password,
        });

        return user;
    }

    public async find(): Promise<IUser[]> {
        const users = await this.ormRepository.find();

        return users;
    }

    public async findById(id: number): Promise<IUser> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }
    
    public async findByEmail(email: string): Promise<IUser> {
        const user = await this.ormRepository.findOne({ 
            where: { 
                email 
            } 
        });

        return user;
    }

}