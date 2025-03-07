import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { Header } from '../pages/Header.jsx';
import { Footer } from '../pages/Footer.jsx';

export const Layout = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        }}>
            <Header />
            <Container component="main" sx={{ my: 4, flex: 1 }}>
                <Outlet />
            </Container>
            <Footer />
        </Box>
    );
};