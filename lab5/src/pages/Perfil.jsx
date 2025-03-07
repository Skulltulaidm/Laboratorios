import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Typography,
    Box,
    Paper,
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@mui/material';
import { Person, Email, Phone, LocationOn } from '@mui/icons-material';

export const Perfil = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username') || 'Usuario';

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Perfil de Usuario
            </Typography>

            <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'center', sm: 'flex-start' },
                    gap: 3,
                    mb: 3
                }}>
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            bgcolor: 'primary.main',
                            fontSize: '3rem'
                        }}
                    >
                        {username.charAt(0).toUpperCase()}
                    </Avatar>

                    <Box>
                        <Typography variant="h5" gutterBottom>
                            {username}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Estudiante
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Estudiante desde Agosto 2019 - Primera generación TEC21
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                    Información de contacto
                </Typography>

                <List>
                    <ListItem>
                        <ListItemIcon>
                            <Email color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Correo electrónico"
                            secondary={`${username}@tec.mx`}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Phone color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Teléfono"
                            secondary="+52 (81) 123-4567"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <LocationOn color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Ubicación"
                            secondary="Monterrey, Nuevo León, México"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Person color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Rol"
                            secondary="Estudiante"
                        />
                    </ListItem>
                </List>
            </Paper>
        </Box>
    );
};