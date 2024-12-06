import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('CalculatorService', () => {
    it('should add to numbers', () => {
        const logger = jasmine.createSpyObj('LoggerService', ['log']);
        const calculator = new CalculatorService(logger);
        
        const result = calculator.add(2, 2);
        
        expect(result).toBe(4, 'unexpected add result');
        expect(logger.log).toHaveBeenCalledTimes(1);
    });

    it('should subtract to numbers', () => {
        const calculator = new CalculatorService(new LoggerService);
        const result = calculator.subtract(2, 2);
        expect(result).toBe(0, 'unexpected subtraction result');
    });
})