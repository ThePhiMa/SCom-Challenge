'use client';

import React, { useState, useEffect } from 'react';
import {
    Slider,
    Button,
    Typography,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import NumberInput from './NumberInput';

interface FormData {
    loanAmount: number;
    interestRate: number;
    repaymentRate: number;
    years: number;
}

interface CalculationResult {
    monthlyPayment: number;
    remainingDebt: number;
    yearlyBreakdown: {
        year: number;
        payment: number;
        interestPortion: number;
        repaymentPortion: number;
        remainingDebt: number;
    }[];
}

export default function LoanCalculatorForm() {
    const [formData, setFormData] = useState<FormData>({
        loanAmount: 10000,
        interestRate: 2.0,
        repaymentRate: 3.0,
        years: 5,
    });

    const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);

    const [isInitialCalculationDone, SetIsInitialCalculationDone] = useState(false);

    const [connectionError, setConnectionError] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: Number(value)
        }));
    };

    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        setFormData(prevData => ({
            ...prevData,
            years: newValue as number
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await sendDataToServer();
        SetIsInitialCalculationDone(true);
    };

    useEffect(() => {
        if (isInitialCalculationDone) {
            sendDataToServer();
        }
    }, [formData, isInitialCalculationDone]);

    const sendDataToServer = async () => {
        console.log('Loan data submitted:', formData);

        try {
            const response = await fetch('http://localhost:3001/calculator/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                console.log('Form submitted successfully');
                // Handle successful submission (e.g., show a success message)
                const result = await response.json();
                console.log("Response from server:", result);
                setCalculationResult(result);
            } else {
                console.error('Form submission failed');
                const errorText = await response.text();
                setConnectionError(`Form submission failed: ${errorText}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setConnectionError(`Error submitting form: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    return (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom color="primary">
                            Tilgungsplan Berechner
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <NumberInput
                            label="Darlehensbetrag (€)"
                            name="loanAmount"
                            value={formData.loanAmount}
                            onChange={handleInputChange}
                            description=""
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <NumberInput
                            label="Sollzins"
                            name="interestRate"
                            value={formData.interestRate}
                            onChange={handleInputChange}
                            description=""
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <NumberInput
                            label="Tilgung (% p.a.)"
                            name="repayment"
                            value={formData.repaymentRate}
                            onChange={handleInputChange}
                            description=""
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography gutterBottom>Zinsbindungsdauer: {formData.years} Jahre</Typography>
                        <Slider
                            value={formData.years}
                            onChange={handleSliderChange}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={30}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Berechnen
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {calculationResult && (
                            <div>
                                <Typography variant="h6" gutterBottom>Ergebnis:</Typography>
                                <Typography>Monatliche Rate: {calculationResult.monthlyPayment}€</Typography>
                                <Typography>Restschuld: {calculationResult.remainingDebt}€</Typography>

                                {calculationResult.yearlyBreakdown && (
                                    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Jahr</TableCell>
                                                    <TableCell align="right">Jährliche Rate</TableCell>
                                                    <TableCell align="right">Zinsanteil</TableCell>
                                                    <TableCell align="right">Tilgungsanteil</TableCell>
                                                    <TableCell align="right">Restschuld</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {calculationResult.yearlyBreakdown.map((row) => (
                                                    <TableRow key={row.year}>
                                                        <TableCell component="th" scope="row">
                                                            {row.year}
                                                        </TableCell>
                                                        <TableCell align="right">{row.payment.toFixed(2)}€</TableCell>
                                                        <TableCell align="right">{row.interestPortion.toFixed(2)}€</TableCell>
                                                        <TableCell align="right">{row.repaymentPortion.toFixed(2)}€</TableCell>
                                                        <TableCell align="right">{row.remainingDebt.toFixed(2)}€</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                            </div>
                        )}
                        {connectionError && (
                            <div>
                                <p>{connectionError}</p>
                            </div>
                        )}
                    </Grid>
                </Grid>
            </form>
        </Paper >
    );
}