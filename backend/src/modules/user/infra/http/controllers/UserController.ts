import CreateUserService from "@modules/user/services/CreateUserService";
import DeleteUserService from "@modules/user/services/DeleteUserService";
import EditProfileService from "@modules/user/services/EditProfileService";
import ListUsersService from "@modules/user/services/ListUsersService";
import ShowUserService from "@modules/user/services/ShowUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class UserController {
    public async index(req: Request, res: Response): Promise<Response> {
        const listUsers = container.resolve(ListUsersService);

        const user = await listUsers.execute();

        return res.json(user);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const showUser = container.resolve(ShowUserService);

        const user = await showUser.execute(Number(id));

        return res.json(user);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = req.body;

            const createUser = container.resolve(CreateUserService);

            const user = await createUser.execute({ 
                name,
                email, 
                password,
            });

            return res.json(user);

        } catch (error) {
            return res.json(error.message);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password, old_password } = req.body;
            const { id } = req.user;

            const editProfile = container.resolve(EditProfileService);

            const user = await editProfile.execute({ 
                id: Number(id),
                name, 
                email, 
                password,
                old_password,
            })

            return res.json(user);
            
        } catch (error) {
            return res.json(error.message);
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteUser = container.resolve(DeleteUserService);

        await deleteUser.execute(Number(id));

        return res.json({
            message: 'Deletado com Sucesso',
        });
    }
}