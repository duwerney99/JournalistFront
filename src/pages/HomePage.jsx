import { Box, Typography, Button, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box
      sx={{
        backgroundColor: '#e3f2fd',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          padding: 4,
          borderRadius: 4,
          textAlign: 'center',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }}
      >
        <Typography variant="h4" gutterBottom>
          ¡Bienvenido!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Aquí podrás gestionar tus jornadas laborales.
        </Typography>

        <Box sx={{ marginTop: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ marginBottom: 2 }}
          >
            Fichar Entrada
          </Button>

          <Button 
            variant="outlined" 
            color="primary" 
            fullWidth 
            sx={{ marginBottom: 2 }}
          >
            Fichar Salida
          </Button>

          <Button 
            variant="text" 
            color="error" 
            fullWidth 
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;
