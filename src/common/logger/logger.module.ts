import { Global, Module } from "@nestjs/common";
import { AppLogger } from "./app.logger";

@Global()
@Module({
    providers:[AppLogger],
    exports:[AppLogger],
})
export class LoggerModule{}