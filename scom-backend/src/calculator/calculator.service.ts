import { Injectable } from '@nestjs/common';

class LoanDataDto {
    loanAmount: number;
    interestRate: number;
    initialRepayment: number;
    years: number;
}


@Injectable()
export class CalculatorService {
    calculateLoanData(loanData: LoanDataDto) {
        // Todo: Insert calculations
        const result = 10;
        return {
            result
        };
    }
}
