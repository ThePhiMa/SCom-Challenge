'use client';

import React, { useState } from 'react';
import {
    Slider,
    Button,
    Typography,
    Grid,
    Paper
} from '@mui/material';
import NumberInput from './NumberInput';

interface FormData {
    loanAmount: number;
    interestRate: number;
    initialRepayment: number;
    years: number;
}

export default function LoanCalculatorForm() {
    const [formData, setFormData] = useState<FormData>({
        loanAmount: 0,
        interestRate: 0,
        initialRepayment: 0,
        years: 5,
    });

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
        console.log('Loan data submitted:', formData);

        // try {
        //     const response = await fetch('http://localhost:3001/calculator/calculate', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(formData),
        //     });
        //     if (response.ok) {
        //         console.log('Form submitted successfully');
        //         // Handle successful submission (e.g., show a success message)
        //     } else {
        //         console.error('Form submission failed');
        //         // Handle errors (e.g., show an error message)
        //     }
        // } catch (error) {
        //     console.error('Error submitting form:', error);
        //     // Handle network errors
        // }
    };

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
                            description="Betrag des Darlehens"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <NumberInput
                            label="Sollzins"
                            name="interestRate"
                            value={formData.interestRate}
                            onChange={handleInputChange}
                            description="Sollzins des Darlehens"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <NumberInput
                            label="Anfängliche Tilgung"
                            name="initialRepayment"
                            value={formData.initialRepayment}
                            onChange={handleInputChange}
                            description="Anfängliche Tilgung"
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
                </Grid>
            </form>
        </Paper >
    );
}