import { compare, hash } from "bcryptjs";

export class BcryptHashProvider {
    public async generateHash(payload: string): Promise<string> {
        return await hash(payload, 8);
    }

    public async compareHash(payload: string, hash: string): Promise<boolean> {
        return await compare(payload, hash);
    }
}