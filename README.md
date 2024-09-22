![NextJS](https://img.shields.io/badge/License-MIT-blue)
![NextJS](https://img.shields.io/badge/NextJS-14.2.12-blue)
![NextJS](https://img.shields.io/badge/NestJS-10.4.3-red)

# Loan Calculator

A full-stack web application for calculating loan repayment plans (in German). This project consists of a React frontend for user interaction and a NestJS backend for performing calculations.

## Features

- Calculate monthly payments based on loan amount, interest rate, repayment rate, and loan term
- View yearly breakdown of payments, including interest and principal portions
- Responsive design for various screen sizes
- Real-time updates as user inputs change

![Tilgungsrechner](https://notenoughsleep.eu/files/Tilgungsrechner_Screen1.png)

## Tech Stack

### Frontend
- React
- Material-UI
- TypeScript

### Backend
- NestJS
- TypeScript

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/loan-calculator.git
   cd loan-calculator
   ```

2. Install frontend dependencies
   ```
   cd frontend
   npm install
   ```

3. Install backend dependencies
   ```
   cd ../backend
   npm install
   ```

### Running the application

1. Start the backend server
   ```
   cd backend
   npm run start:dev
   ```

2. In a new terminal, start the frontend application
   ```
   cd frontend
   npm run build
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Enter the loan amount
2. Set the interest rate
3. Adjust the repayment rate
4. Select the loan term in years
5. View the calculated monthly payment and yearly breakdown

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
