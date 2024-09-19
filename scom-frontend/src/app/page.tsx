'use client';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LoanCalculatorForm from './components/LoanCalculatorInputForm'

export default function Home() {
  return (
    <Container maxWidth="sm">
      {
        <Box sx={{ my: 4 }}>
          <LoanCalculatorForm />
        </Box>
      }
    </Container>
  );
}