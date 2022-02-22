import AppError from "@shared/errors/AppError";
import { IBcryptHashProvider } from "@shared/container/providers/Bcrypt/models/IBcryptHashProvider";
import { inject, injectable } from "tsyringe";
import { ICreateUser } from "../domain/models/ICreateUser";
import { IUser } from "../domain/models/IUser";
import { IUserRepository } from "../domain/repositories/IUserRepository";

@injectable()
export default class CreateUserService {
    constructor(
        @inject('userRepository')
        private userRepository: IUserRepository,
        @inject('hashProvider')
        private hashProvider: IBcryptHashProvider,
    ) {}

    public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
        const emailExists = await this.userRepository.findByEmail(email);

        if(emailExists) {
            throw new AppError('This email Already Exists');
        }

        const user = await this.userRepository.create({ 
            name, 
            email, 
            password,
        });

        user.password = await this.hashProvider.generateHash(password);

        await this.userRepository.save(user);

        return user;
    }
}