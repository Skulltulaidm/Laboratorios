import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';

export const Home = () => {
  return (
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Sandbox App
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Me está gustando más React que ASP.NET.
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  React Router
                </Typography>
                <Typography variant="body2">
                  Para manejar rutas y navegación en React con React Router.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Material UI
                </Typography>
                <Typography variant="body2">
                  Para crear UIs chidas.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Estado y Autenticación
                </Typography>
                <Typography variant="body2">
                  Sistema de login.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
  );
};