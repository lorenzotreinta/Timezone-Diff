"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
let TimeService = class TimeService {
    constructor() {
        this.time_diffs = [];
    }
    getTimeDiff(str_start_date, str_end_date) {
        const start_date = new Date(str_start_date);
        const end_date = new Date(str_end_date);
        if (!start_date.valueOf() || !end_date.valueOf()) {
            throw new common_2.BadRequestException("Start date or end date is not in ISO8601 format.");
        }
        const diff = (end_date.valueOf() - start_date.valueOf());
        if (diff < 0) {
            throw new common_2.BadRequestException("End date must be greater than or equal to start date.");
        }
        return this.msToISO(this.storeTimeDiff(diff));
    }
    getSmallestDiff() {
        return this.msToISO([...this.time_diffs][0]);
    }
    getLargestDiff() {
        return this.msToISO([...this.time_diffs][this.time_diffs.length - 1]);
    }
    getStored() {
        return [...this.time_diffs];
    }
    toDate(iso_str) {
        const date = new Date(iso_str);
        return date;
    }
    storeTimeDiff(diff) {
        this.time_diffs.push(diff);
        this.time_diffs.sort((n1, n2) => n1 - n2);
        return diff;
    }
    msToISO(diff) {
        const ms_in_sec = 1000;
        const sec_in_min = 60;
        const min_in_hr = 60;
        const hr_in_day = 24;
        let diff_temp = diff;
        console.log(diff_temp);
        let ms = diff_temp % ms_in_sec;
        diff_temp -= ms;
        diff_temp = diff_temp / ms_in_sec;
        console.log(diff_temp);
        let sec = diff_temp % sec_in_min;
        diff_temp -= sec;
        diff_temp = diff_temp / sec_in_min;
        console.log(diff_temp);
        let min = diff_temp % min_in_hr;
        diff_temp -= min;
        diff_temp = diff_temp / min_in_hr;
        console.log(diff_temp);
        let hr = diff_temp % hr_in_day;
        diff_temp -= hr;
        diff_temp = diff_temp / hr_in_day;
        console.log(diff_temp);
        let day = diff_temp;
        return (`${day}T${this.addLeadingZeros(hr, 2)}:${this.addLeadingZeros(min, 2)}:${this.addLeadingZeros(sec, 2)}.${this.addLeadingZeros(ms, 3)}`);
    }
    addLeadingZeros(num, totalLength) {
        return String(num).padStart(totalLength, '0');
    }
};
TimeService = __decorate([
    (0, common_1.Injectable)()
], TimeService);
exports.TimeService = TimeService;
//# sourceMappingURL=time.service.js.map