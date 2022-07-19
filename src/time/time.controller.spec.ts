import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TimeController } from './time.controller';
import { TimeService } from './time.service'

describe('TimeController', () => {
  let timeController: TimeController;
  let timeService: TimeService;

  beforeEach(async () => {
    const time: TestingModule = await Test.createTestingModule({
      controllers: [TimeController],
      providers: [TimeService],
    }).compile();

    timeController = time.get<TimeController>(TimeController);
    timeService = time.get<TimeService>(TimeService);
  });

  it('should be defined', () => {
    expect(timeController).toBeDefined();
  })

  describe('Test calculateTimeDiff()', () => {
    it('should be \"0T00:00:00.000\"', () => {
      expect(timeController.calculateTimeDiff("1970-01-01T12:00", "1970-01-01T12:00")).toBe("0T00:00:00.000")
    });
    it('should be \"365T00:00:00.000\"', () => {
      expect(timeController.calculateTimeDiff("1970-01-01T12:00", "1971-01-01T12:00")).toBe("365T00:00:00.000")
    });
    it('should be \"3652T05:05:05.050\"', () => {
      expect(timeController.calculateTimeDiff("1970-01-01T12:00", "1980-01-01T17:05:05.050")).toBe("3652T05:05:05.050")
    });
    // TODO: Fix error cases
    // it('should return error', () => {
    //   expect(timeController.calculateTimeDiff("1970-01-01T12:00", "1920-01-01T12:00")).toThrow()
    // });
    // it('should return error', () => {
    //   expect(timeController.calculateTimeDiff("1970-15", "1920-01-01T12:00")).toThrow("BadRequestException");
    // });
  });

  it('should be \"0T00:00:00.000\"', () => {
    timeController.calculateTimeDiff("1970-01-01T12:00", "1980-01-01T17:05:05.050");
    timeController.calculateTimeDiff("1970-01-01T12:00", "1970-01-01T12:00")
    expect(timeController.getSmallestDiff()).toBe("0T00:00:00.000")
  });

  it('should be \"3652T05:05:05.050\"', () => {
    timeController.calculateTimeDiff("1970-01-01T12:00", "1980-01-01T17:05:05.050");
    timeController.calculateTimeDiff("1970-01-01T12:00", "1970-01-01T12:00")
    expect(timeController.getLargestDiff()).toBe("3652T05:05:05.050")
  });
});
