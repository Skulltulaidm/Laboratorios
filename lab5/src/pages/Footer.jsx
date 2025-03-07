import React from 'react';
import { Box, Typography, Container } from '@mui/material';

export const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: 'grey.200',
            }}
        >
        <Container maxWidth="sm">
                <Typography variant="body2" color="text.secondary" align="center">
                    © {new Date().getFullYear()} Laboratorio 5 - A01612435
                </Typography>
            </Container>
        </Box>
    );
};