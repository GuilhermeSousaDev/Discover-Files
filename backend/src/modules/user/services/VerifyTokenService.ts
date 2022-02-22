import { IJsonWebTokenProvider } from "@shared/container/providers/JWT/models/IJsonwebTokenProvider";
import { inject, injectable } from "tsyringe";

@injectable()
export default class VerifyTokenService {
    constructor(
        @inject('jwtProvider')
        private jwtProvider: IJsonWebTokenProvider,
    ) {}

    public execute(token: string) {
        const verifiedToken = this.jwtProvider.verifyToken(token);

        return verifiedToken;
    }   
}