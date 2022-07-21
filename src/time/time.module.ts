import { Module } from "@nestjs/common";
import { TimeDifferenceCalculatorService } from "./time.service";
import { TimeDifferenceCalculatorController } from "./controllers/time.controller";

@Module({
    imports: [],
    controllers: [TimeDifferenceCalculatorController],
    providers: [TimeDifferenceCalculatorService]
})
export class TimeModule{};