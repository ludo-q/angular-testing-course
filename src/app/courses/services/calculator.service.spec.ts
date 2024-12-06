import { CalculatorService } from "./calculator.service";

describe('CalculatorService', () => {
    let calculator: CalculatorService,
        loggerSpy: any;

    beforeEach(() => {
        console.log('Calling BeforeEach');
        
        loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
        calculator = new CalculatorService(loggerSpy);
    })
    it('should add to numbers', () => {
        console.log('add test');
        const result = calculator.add(2, 2);
        
        expect(result).toBe(4, 'unexpected add result');
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });

    it('should subtract to numbers', () => {
        console.log('subtract test');
        const result = calculator.subtract(2, 2);

        expect(result).toBe(0, 'unexpected subtraction result');
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });
})