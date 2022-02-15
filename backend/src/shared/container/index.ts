import { IUserRepository } from '@modules/user/domain/repositories/IUserRepository';
import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUserRepository>(
    'userRepository',
    UserRepository,
);