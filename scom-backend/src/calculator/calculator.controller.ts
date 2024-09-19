import { Controller, Post, Body } from '@nestjs/common';
import { CalculatorService } from './calculator.service';

class LoanDataDto {
    loanAmount: number;
    interestRate: number;
    repaymentRate: number;
    years: number;
}

@Controller('calculator')
export class CalculatorController {
    constructor(private readonly calculatorService: CalculatorService) { }

    @Post('calculate')
    calculateLoanData(@Body() loanData: LoanDataDto) {
        return this.calculatorService.calculateLoanData(loanData);
    }
}
