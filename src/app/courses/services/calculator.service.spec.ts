import { CalculatorService } from "./calculator.service";
import {TestBed} from '@angular/core/testing';
import { LoggerService } from "./logger.service";

describe('CalculatorService', () => {
    let calculator: CalculatorService,
        loggerSpy: any;

    beforeEach(() => {
        console.log('Calling BeforeEach');
        
        loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                {provide: LoggerService, useValue: loggerSpy}
            ]
        });
        calculator = TestBed.inject(CalculatorService);
    });

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