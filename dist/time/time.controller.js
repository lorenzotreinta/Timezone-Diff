"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeController = void 0;
const common_1 = require("@nestjs/common");
const time_service_1 = require("./time.service");
const common_2 = require("@nestjs/common");
let TimeController = class TimeController {
    constructor(timeService) {
        this.timeService = timeService;
    }
    calculateTimeDiff(start_date, end_date) {
        if (typeof start_date !== "string" || typeof end_date !== "string") {
            throw new common_2.BadRequestException("dates must be string in ISO 8601 format");
        }
        const time_diff = this.timeService.getTimeDiff(start_date, end_date);
        return time_diff;
    }
    getStored() {
        return this.timeService.getStored();
    }
    getSmallestDiff() {
        return this.timeService.getSmallestDiff();
    }
    getLargestDiff() {
        return this.timeService.getLargestDiff();
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('start_date')),
    __param(1, (0, common_1.Body)('end_date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", String)
], TimeController.prototype, "calculateTimeDiff", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TimeController.prototype, "getStored", null);
__decorate([
    (0, common_1.Get)('smallest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TimeController.prototype, "getSmallestDiff", null);
__decorate([
    (0, common_1.Get)('largest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TimeController.prototype, "getLargestDiff", null);
TimeController = __decorate([
    (0, common_1.Controller)('time'),
    __metadata("design:paramtypes", [time_service_1.TimeService])
], TimeController);
exports.TimeController = TimeController;
//# sourceMappingURL=time.controller.js.map