'use client';

import React, { useRef } from 'react';
import { TextField } from '@mui/material';

interface NumberInputProps {
    label: string;
    name: string;
    value: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NumberInput({ label, name, value, onChange }: NumberInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.select();
        }
    };

    return (
        <TextField
            fullWidth
            label={label}
            name={name}
            type="number"
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            inputRef={inputRef}
            InputLabelProps={{
                shrink: true,
            }}
        />
    );
}