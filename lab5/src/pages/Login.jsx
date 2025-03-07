import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert
} from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validUser = 'skulltula';
    const validPassword = 'k9NijT3AkF1A0neWeM29';

    const handleLogin = () => {
        if (username === validUser && password === validPassword) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            navigate('/dashboard');
        } else {
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70vh'
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    maxWidth: 400,
                    width: '100%'
                }}
            >
                <Typography variant="h5" component="h1" gutterBottom align="center">
                    Iniciar Sesión
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Usuario"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLogin}
                        startIcon={<LoginIcon />}
                    >
                        Iniciar Sesión
                    </Button>
                    <Typography variant="caption" display="block" align="center">
                        Usuario: skulltula, Contraseña: k9NijT3AkF1A0neWeM29
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};