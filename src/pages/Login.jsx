import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/auth/authSlice';
import { loginUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const data = await loginUser(email, password);
      dispatch(loginSuccess(data.accessToken)); // guardamos el token
      navigate('/'); // redirigir al Home
    } catch (err) {
      console.error(err);
      dispatch(loginFailure('Credenciales inválidas'));
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#e3f2fd', 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xs" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', padding: 4, borderRadius: 2 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="50vh"
        >
          <Typography variant="h4" gutterBottom>
            Iniciar Sesión
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
            <TextField
              label="Correo electrónico"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <Typography color="error" variant="body2" align="center">
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              style={{ marginTop: '1rem' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Ingresar'}
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

