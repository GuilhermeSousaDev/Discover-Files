import UpdateUserAvatarService from "@modules/user/services/UpdateUserAvatarService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class AvatarController {
    public async update(req: Request, res: Response): Promise<Response> {
        const { originalname, buffer } = req.file;
        const { id } = req.params;

        const updateAvatar = container.resolve(UpdateUserAvatarService);

        const avatar = await updateAvatar.execute({ 
            avatar: {
                filename: originalname,
                buffer,
            },
            id: Number(id),
        });

        return res.json(avatar);
    }
}