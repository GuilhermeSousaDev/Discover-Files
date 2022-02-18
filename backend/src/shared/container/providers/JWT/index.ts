import { container } from "tsyringe";
import { JsonWebTokenProvider } from "./implementations/JsonWebTokenProvider";
import { IJsonWebTokenProvider } from "./models/IJsonwebTokenProvider";

container.registerSingleton<IJsonWebTokenProvider>(
    'jwtProvider',
    JsonWebTokenProvider,
);