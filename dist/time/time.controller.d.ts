import { TimeService } from "./time.service";
export declare class TimeController {
    private readonly timeService;
    constructor(timeService: TimeService);
    calculateTimeDiff(start_date: string, end_date: string): string;
    getSmallestDiff(): string;
    getLargestDiff(): string;
}
