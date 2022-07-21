import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TimeDifferenceCalculatorController } from './time.controller';
import { TimeDifferenceCalculatorService } from './time.service'

describe('TimeController', () => {
  let timeDifferenceCalculatorController: TimeDifferenceCalculatorController;
  let timeDifferenceCalculatorService: TimeDifferenceCalculatorService;

  beforeEach(async () => {
    const time: TestingModule = await Test.createTestingModule({
      controllers: [TimeDifferenceCalculatorController],
      providers: [TimeDifferenceCalculatorService],
    }).compile();

    timeDifferenceCalculatorController = time.get<TimeDifferenceCalculatorController>(TimeDifferenceCalculatorController);
    timeDifferenceCalculatorService = time.get<TimeDifferenceCalculatorService>(TimeDifferenceCalculatorService);
  });

  it('should be defined', () => {
    expect(timeDifferenceCalculatorController).toBeDefined();
  })

  describe('Test calculateTimeDiff()', () => {
    it('should be \"0T00:00:00.000\"', () => {
      expect(timeDifferenceCalculatorController.calculateTimeDiff("1970-01-01T12:00", "1970-01-01T12:00")).toBe("0T00:00:00.000")
    });
    it('should be \"365T00:00:00.000\"', () => {
      expect(timeDifferenceCalculatorController.calculateTimeDiff("1970-01-01T12:00", "1971-01-01T12:00")).toBe("365T00:00:00.000")
    });
    it('should be \"3652T05:05:05.050\"', () => {
      expect(timeDifferenceCalculatorController.calculateTimeDiff("1970-01-01T12:00", "1980-01-01T17:05:05.050")).toBe("3652T05:05:05.050")
    });
    it('should be \"0T00:00:00.000\"', () => {
      expect(timeDifferenceCalculatorController.calculateTimeDiff("1970-01-01T12:00", "1970-01-01T12:00-03:00")).toBe("0T00:00:00.000")
    });
    it('should be \"0T02:00:00.000\"', () => {
      expect(timeDifferenceCalculatorController.calculateTimeDiff("1970-01-01T12:00", "1970-01-01T12:00-05:00")).toBe("0T02:00:00.000")
    });
    test('BadRequestException: Start date or end date is not in ISO8601 format.', () => {
      expect(() => {
        timeDifferenceCalculatorController.calculateTimeDiff("1970-15", "1920-01-01T12:00");
      }).toThrow();
    });
    test('BadRequestException: End date must be greater than or equal to start date.', () => {
      expect(() => {
        timeDifferenceCalculatorController.calculateTimeDiff("1970-01-01T12:00", "1920-01-01T12:00");
      }).toThrow();
    });

  });

  it('should be \"0T00:00:00.000\"', () => {
    timeDifferenceCalculatorController.calculateTimeDiff("1970-01-01T12:00", "1980-01-01T17:05:05.050");
    timeDifferenceCalculatorController.calculateTimeDiff("1970-01-01T12:00", "1970-01-01T12:00")
    expect(timeDifferenceCalculatorController.getSmallestDiff()).toBe("0T00:00:00.000")
  });

  it('should be \"3652T05:05:05.050\"', () => {
    timeDifferenceCalculatorController.calculateTimeDiff("1970-01-01T12:00", "1980-01-01T17:05:05.050");
    timeDifferenceCalculatorController.calculateTimeDiff("1970-01-01T12:00", "1970-01-01T12:00")
    expect(timeDifferenceCalculatorController.getLargestDiff()).toBe("3652T05:05:05.050")
  });
});
