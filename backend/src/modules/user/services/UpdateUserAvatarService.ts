import fs from 'fs';
import crypto from 'crypto';
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
            const path = `uploads_avatar/${user.avatar}`
            const fileExists = fs.statSync(path);

            if(fileExists) {
                fs.unlinkSync(path);
            }
        }

        const acceptedTypes = ['jpg', 'jpeg', 'png'];

        const [, typeFile] = avatar.filename.split('.');

        const type = acceptedTypes.includes(typeFile);

        if(!type) {
            throw new AppError('Just is permited files of type jpg, png, jpeg');
        }
        
        const hash = crypto.randomBytes(10).toString('hex');
        const filenameHash = `${hash}-${avatar.filename}`;

        fs.writeFileSync(`uploads_avatar/${filenameHash}`, avatar.buffer);

        user.avatar = filenameHash;

        await this.userRepository.save(user);

        return user;
    }
}