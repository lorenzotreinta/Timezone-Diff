import { Injectable } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common";

@Injectable()
export class TimeDifferenceCalculatorService {
    // Stores time diffs in ms into a sorted array
    private time_diffs: number[] = [];

    // Gets the time diff of two dates in ISO8601 format in ms
    getTimeDiff(str_start_date: string, str_end_date: string): string {
        //TODO: Check that all params are there
        const start_date = new Date(str_start_date);
        const end_date = new Date(str_end_date);
        if (!start_date.valueOf() || !end_date.valueOf()) { 
            throw new BadRequestException("Start date or end date is not in ISO8601 format.")
        }
        const diff: number =(end_date.valueOf() - start_date.valueOf());
        if (diff < 0) {
            throw new BadRequestException("End date must be greater than or equal to start date.")
        }
        const iso_date = this.msToISO(diff);
        this.storeTimeDiff(diff);
        return iso_date;
    }

    // Returns the smallest time diff from the sorted array time_diffs
    getSmallestDiff() {
        return this.msToISO([...this.time_diffs][0]);
    }

    // Returns the largest time diff from the sorted array time_diffs
    getLargestDiff() {
        return this.msToISO([...this.time_diffs][this.time_diffs.length-1]);
    }

    // Pushes the time diff into the array and sorts it
    private storeTimeDiff(diff: number) {
        this.time_diffs.push(diff);
        this.time_diffs.sort((n1,n2) => n1 - n2);
    }

    // Return diff in "DDTHH:mm:ss.sss" format
    private msToISO(diff: number): string {
        const ms_in_sec: number = 1000;
        const sec_in_min: number = 60;
        const min_in_hr: number = 60;
        const hr_in_day: number = 24;
        let diff_temp = diff;
        let ms: number = diff_temp%ms_in_sec;
        diff_temp -= ms;
        diff_temp = diff_temp / ms_in_sec;
        let sec: number = diff_temp%sec_in_min;
        diff_temp -= sec;
        diff_temp = diff_temp / sec_in_min;
        let min: number = diff_temp%min_in_hr;
        diff_temp -= min;
        diff_temp = diff_temp / min_in_hr;
        let hr: number = diff_temp%hr_in_day;
        diff_temp -= hr;
        diff_temp = diff_temp / hr_in_day;
        let day: number = diff_temp;
        return(`${day}T${this.addLeadingZeros(hr,2)}:${this.addLeadingZeros(min,2)}:${this.addLeadingZeros(sec,2)}.${this.addLeadingZeros(ms,3)}`);
    }

    // Adds padding of 0
    private addLeadingZeros(num: number, totalLength: number): string {
        return String(num).padStart(totalLength, '0');
      }
}