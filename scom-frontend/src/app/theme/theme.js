'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#B39DDB', // Pastel purple
        },
        secondary: {
            main: '#81C784', // Pastel green
        },
        background: {
            default: '#121212',
            paper: '#1E1E1E',
        },
        text: {
            primary: '#E0E0E0',
            secondary: '#B0B0B0',
        },
        error: {
            main: '#EF9A9A', // Pastel red
        },
        warning: {
            main: '#FFE082', // Pastel yellow
        },
        info: {
            main: '#90CAF9', // Pastel blue
        },
        success: {
            main: '#A5D6A7', // Pastel green
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#B39DDB',
                        },
                        '&:hover fieldset': {
                            borderColor: '#9575CD',
                        },
                    },
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
                thumb: {
                    color: '#B39DDB',
                },
                track: {
                    color: '#9575CD',
                },
                rail: {
                    color: '#7E57C2',
                },
            },
        },
    },
});

export default theme;