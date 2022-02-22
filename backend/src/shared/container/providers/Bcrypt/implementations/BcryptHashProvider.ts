import { compare, hash } from "bcryptjs";
import { IBcryptHashProvider } from "../models/IBcryptHashProvider";

export class BcryptHashProvider implements IBcryptHashProvider {
    public async generateHash(payload: string): Promise<string> {
        return await hash(payload, 8);
    }

    public async compareHash(payload: string, hash: string): Promise<boolean> {
        return await compare(payload, hash);
    }
}