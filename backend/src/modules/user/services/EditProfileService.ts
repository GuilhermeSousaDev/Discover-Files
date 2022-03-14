import { IBcryptHashProvider } from "@shared/container/providers/Bcrypt/models/IBcryptHashProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IEditUser } from "../domain/models/IEditUser";
import { IUser } from "../domain/models/IUser";
import { IUserRepository } from "../domain/repositories/IUserRepository";

@injectable()
export default class EditProfileService {
    constructor(
        @inject('userRepository')
        private userRepository: IUserRepository,
        @inject('hashProvider')
        private hashProvider: IBcryptHashProvider,
    ) {}

    public async execute({ 
        id,
        name, 
        email, 
        password,
        old_password,
    }: IEditUser): Promise<IUser> {
        const user = await this.userRepository.findById(id);

        if(!user) {
            throw new AppError('User not found');
        }

        const userEmailExists = await this.userRepository.findByEmail(email);

        if(userEmailExists && userEmailExists.id !== user.id) {
            throw new AppError('There is already one user with this email');
        }

        if(password && !old_password) {
            throw new AppError('Old Password is Required');
        }

        if(password && old_password) {
            const checkOldPassword = await this.hashProvider
                .compareHash(old_password, user.password);

            if(!checkOldPassword) {
                throw new AppError('Old password does not match');
            }
        }

        const newPassword = await this.hashProvider.generateHash(password);

        user.name = name;
        user.email = email;
        user.password = newPassword;

        await this.userRepository.save(user);

        return user;
    }
}