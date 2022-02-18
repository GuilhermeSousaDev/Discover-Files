import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IPayload } from "../domain/models/IPayload";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { ICreateSession } from "../domain/models/ICreateSession";
import { IJsonWebTokenProvider } from "@shared/container/providers/JWT/models/IJsonwebTokenProvider";
import { IBcryptHashProvider } from "@shared/container/providers/Bcrypt/models/IBcryptHashProvider";

@injectable()
export default class CreateSessionService {
    constructor(
        @inject('userRepository')
        private userRepository: IUserRepository,
        @inject('jwtProvider')
        private jwtProvider: IJsonWebTokenProvider,
        @inject('hashProvider')
        private hashProvider: IBcryptHashProvider,
    ) {}

    public async execute({ email, password }: ICreateSession): Promise<IPayload> {
        const user = await this.userRepository.findByEmail(email);

        if(!user) {
            throw new AppError('User Not Found');
        }

        const verifyPassword = await this.hashProvider
            .compareHash(password, user.password);

        if(!verifyPassword) {
            throw new AppError('Incorrect Password');
        }

        const token = this.jwtProvider.generateToken({
            id: user.id, 
            name: user.name,
            avatar: user.avatar,
        });

        return {
            user,
            token,
        };
    }
}