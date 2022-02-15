import AppError from "@shared/errors/AppError";
import { auth } from "@config/auth";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IPayload } from "../domain/models/IPayload";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { ICreateToken } from "../domain/models/ICreateToken";

@injectable()
export default class CreateSessionService {
    constructor(
        @inject('userRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute({ email, password }: ICreateToken): Promise<IPayload> {
        const user = await this.userRepository.findByEmail(email);

        if(!user) {
            throw new AppError('User Not Found');
        }

        const verifyPassword = await compare(password, user.password);

        if(!verifyPassword) {
            throw new AppError('Incorrect Password');
        }

        const token = sign({ 
            id: user.id, 
            name: user.name,
        }, auth.secret, { expiresIn: auth.expires });

        return {
            user,
            token,
        };
    }
}