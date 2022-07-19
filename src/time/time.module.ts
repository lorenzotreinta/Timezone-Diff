import { Module } from "@nestjs/common";
import { TimeService } from "./time.service";
import { TimeController } from "./time.controller";

@Module({
    imports: [],
    controllers: [TimeController],
    providers: [TimeService]
})
export class TimeModule{};