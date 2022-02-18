import { IUserRepository } from '@modules/user/domain/repositories/IUserRepository';
import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository';
import { container } from 'tsyringe';

import './providers/JWT';
import './providers/Bcrypt';

container.registerSingleton<IUserRepository>(
    'userRepository',
    UserRepository,
);