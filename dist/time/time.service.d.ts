export declare class TimeService {
    private time_diffs;
    getTimeDiff(str_start_date: string, str_end_date: string): string;
    getSmallestDiff(): string;
    getLargestDiff(): string;
    private storeTimeDiff;
    private msToISO;
    private addLeadingZeros;
}
