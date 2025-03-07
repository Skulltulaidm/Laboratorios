import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Dashboard as DashboardIcon, Home as HomeIcon, Person as PersonIcon } from '@mui/icons-material';

export const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Laboratorio 5
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button color="inherit" onClick={() => navigate('/home')}>
                        <HomeIcon sx={{ mr: 1 }} />
                        Home
                    </Button>
                    {isLoggedIn && (
                        <>
                            <Button color="inherit" onClick={() => navigate('/dashboard')}>
                                <DashboardIcon sx={{ mr: 1 }} />
                                Dashboard
                            </Button>
                            <Button color="inherit" onClick={() => navigate('/perfil')}>
                                <PersonIcon sx={{ mr: 1 }} />
                                Perfil
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    )}
                    {!isLoggedIn && (
                        <Button color="inherit" onClick={() => navigate('/login')}>
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};