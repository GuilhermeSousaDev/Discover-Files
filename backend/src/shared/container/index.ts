import { container } from 'tsyringe';

import { IUserRepository } from '@modules/user/domain/repositories/IUserRepository';
import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository';
import { FilesRepository } from '@modules/files/infra/typeorm/repositories/FilesRepository';
import { IFilesRepository } from '@modules/files/domain/repositories/IFilesRepository';

import './providers/Bcrypt';
import './providers/JWT';

container.registerSingleton<IUserRepository>(
    'userRepository',
    UserRepository,
);

container.registerSingleton<IFilesRepository>(
    'fileRepository',
    FilesRepository,
);