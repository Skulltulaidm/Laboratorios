import React from 'react';
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
  TrendingUp,
  People,
  Assessment,
  Notifications
} from '@mui/icons-material';

export const Dashboard = () => {
  const username = localStorage.getItem('username') || 'Usuario';

  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      window.location.href = '/login';
    }
  }, []);

  return (
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="h6" gutterBottom>
          Bienvenido, {username}
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Resumen de actividad
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Box sx={{ textAlign: 'center', p: 1 }}>
                    <TrendingUp color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h6">157</Typography>
                    <Typography variant="body2">Visitas</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Box sx={{ textAlign: 'center', p: 1 }}>
                    <People color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h6">24</Typography>
                    <Typography variant="body2">Usuarios</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Box sx={{ textAlign: 'center', p: 1 }}>
                    <Assessment color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h6">89%</Typography>
                    <Typography variant="body2">Rendimiento</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Box sx={{ textAlign: 'center', p: 1 }}>
                    <Notifications color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h6">12</Typography>
                    <Typography variant="body2">Alertas</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Actividad reciente
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Notifications color="primary" />
                  </ListItemIcon>
                  <ListItemText
                      primary="Nuevo mensaje recibido"
                      secondary="Hace 5 minutos"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <People color="primary" />
                  </ListItemIcon>
                  <ListItemText
                      primary="Nuevo usuario registrado"
                      secondary="Hace 2 horas"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <Assessment color="primary" />
                  </ListItemIcon>
                  <ListItemText
                      primary="Reporte generado"
                      secondary="Ayer"
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
  );
};
