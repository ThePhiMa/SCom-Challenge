import { Injectable } from '@nestjs/common';

class LoanDataDto {
    loanAmount: number;
    interestRate: number;
    repaymentRate: number;
    years: number;
}


function calculateLoanData(loanAmount: number, interestRate: number, repaymentRate: number, years: number) {
    // Convert interest rate and repayment to decimal form
    interestRate /= 100;
    repaymentRate /= 100;

    // Calculate initial repayment amount for the first year
    const yearlyRepaymentAmount = loanAmount * repaymentRate;

    // Calculate total yearly payment (interest + repayment)
    const yearlyPayment = (loanAmount * interestRate) + yearlyRepaymentAmount;

    // Calculate monthly payment
    const monthlyPayment = yearlyPayment / 12;

    let remainingDebt = loanAmount;
    const yearlyBreakdown = [];

    // Calculate yearly breakdown
    for (let year = 1; year <= years; year++) {
        const yearlyInterest = remainingDebt * interestRate;
        const yearlyRepayment = yearlyPayment - yearlyInterest;
        remainingDebt -= yearlyRepayment;

        yearlyBreakdown.push({
            year,
            payment: yearlyPayment.toFixed(2),
            interestPortion: yearlyInterest.toFixed(2),
            repaymentPortion: yearlyRepayment.toFixed(2),
            remainingDebt: (Math.max(0, remainingDebt).toFixed(2))
        });
    }

    return {
        monthlyPayment: monthlyPayment.toFixed(2),
        remainingDebt: Math.max(0, remainingDebt).toFixed(2),
        yearlyBreakdown
    };
}

@Injectable()
export class CalculatorService {
    calculateLoanData(loanData: LoanDataDto) {

        const result = calculateLoanData(loanData.loanAmount,
            loanData.interestRate,
            loanData.repaymentRate,
            loanData.years);

        return {
            monthlyPayment: Number(result.monthlyPayment),
            remainingDebt: Number(result.remainingDebt),
            yearlyBreakdown: result.yearlyBreakdown
        };
    }
}