import fs from 'fs';
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateAvatar } from "../domain/models/ICreateAvatar";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUser } from '../domain/models/IUser';

@injectable()
export default class UpdateUserAvatarService {
    constructor(
        @inject('userRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute({ avatar, id }: ICreateAvatar): Promise<IUser> {
        const user = await this.userRepository.findById(id);

        if(!user) {
            throw new AppError('User not found');
        }

        if(user.avatar) {
            const path = `uploads/${user.avatar}`
            const fileExists = fs.statSync(path);

            if(fileExists) {
                fs.unlinkSync(path);
            }
        }

        fs.writeFileSync(`uploads/${avatar.filename}`, avatar.buffer);

        user.avatar = avatar.filename;

        this.userRepository.save(user);

        return user;
    }
}