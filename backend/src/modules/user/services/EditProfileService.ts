import { inject, injectable } from "tsyringe";
import { IEditUser } from "../domain/models/IEditUser";
import { IUser } from "../domain/models/IUser";
import { IUserRepository } from "../domain/repositories/IUserRepository";

@injectable()
export default class EditProfileService {
    constructor(
        @inject('userRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute({ name, email, password }: IEditUser): Promise<IUser[]> {
        //------editar

        const user = await this.userRepository.find();

        return user;
    }
}