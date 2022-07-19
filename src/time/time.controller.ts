import { Controller, Post, Get, Body, Param} from "@nestjs/common";
import { TimeService } from "./time.service";
import { BadRequestException } from "@nestjs/common";


@Controller('time')
export class TimeController {
    constructor(private readonly timeService: TimeService) {}

    // Post as it affects the result of the Get requests
    @Post()
    calculateTimeDiff(
        @Body('start_date') start_date: string,  
        @Body('end_date') end_date: string
        ): string {
            const time_diff = this.timeService.getTimeDiff(start_date, end_date);
            return time_diff;
    }

    @Get('smallest')
    getSmallestDiff() {
        return this.timeService.getSmallestDiff();
    }

    @Get('largest')
    getLargestDiff() {
        return this.timeService.getLargestDiff();
    }
}