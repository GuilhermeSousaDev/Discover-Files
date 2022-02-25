import { IJsonWebTokenProvider } from "@shared/container/providers/JWT/models/IJsonwebTokenProvider";
import { IJwtPayload } from "@shared/container/providers/JWT/models/IJwtPayload";
import { inject, injectable } from "tsyringe";

@injectable()
export default class VerifyTokenService {
    constructor(
        @inject('jwtProvider')
        private jwtProvider: IJsonWebTokenProvider,
    ) {}

    public execute(token: string): IJwtPayload {
        const verifiedToken = this.jwtProvider.verifyToken(token);

        return {
            verifiedToken,
            token,
        };
    }   
}