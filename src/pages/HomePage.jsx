import { Box, Typography, Button, Container, AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Skeleton } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { markEntry, markExit, markResume } from '../api/sessionApi';



function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token, user } = useSelector((state) => state.auth);
    const [name, setName] = useState('Usuario');

    useEffect(() => {
        if (user && user.name) {
            setName(user.name);
        }
    }, [user]);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const handleMarkEntry = async () => {
        try {
            const result = await markEntry(token);
            setSnackbarMessage('Entrada registrada exitosamente!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                showError(error.response.data.error);
            } else {
                showError('Ocurrió un error inesperado.');
            }

        }
    };

    const handleMarkExit = async () => {
        try {
            await markExit(token);

            const resume = await handleResume(token);

            const { date, entryTime, exitTime, workedHours } = resume.data;


            setSnackbarMessage(`Hoy ${date}: Trabajaste ${workedHours.hours} horas y ${workedHours.minutes} minutos`);
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                showError(error.response.data.error);
            } else {
                showError('Ocurrió un error inesperado.');
            }

        }
    };


    const handleResume = async () => {
        try {
            const result = await markResume(token);
            return result;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                showError(error.response.data.error);
            } else {
                showError('Ocurrió un error inesperado.');
            }

        }
    };

    const showError = (message) => {
        setSnackbarMessage(message);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
    };



    return (
        <>

            <AppBar sx={{ backgroundColor: '#2196f3' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setDrawerOpen(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box display="flex" alignItems="center" onClick={handleMenuOpen} sx={{ cursor: 'pointer' }}>
                        {/* <img src={"https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png"} alt="Logo" style={{ width: 40, marginRight: 8 }} /> */}
                        <Avatar
                            src={"https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png"}
                            alt="Logo"
                            sx={{ width: 40, height: 40, marginRight: 1 }}
                        />
                        {name !== 'Usuario' ? (
                            <Typography variant="subtitle2">{name}</Typography>
                        ) : (
                            <Skeleton variant="text" width={80} height={30} />
                        )}
                    </Box>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: { width: 250 }
                }}
            >
                <Box
                    role="presentation"
                    onClick={() => setDrawerOpen(false)}
                    sx={{ padding: 2 }}
                >
                    <Typography variant="h6" gutterBottom>
                        Menú
                    </Typography>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ my: 1 }}
                        onClick={handleMarkEntry}
                    >
                        Fichar Entrada
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ my: 1 }}
                        onClick={handleMarkExit}

                    >
                        Fichar Salida
                    </Button>
                </Box>
            </Drawer>

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


                </Container>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
                onClick={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity={snackbarSeverity}
                    onClose={() => setSnackbarOpen(false)}
                    sx={{ width: '100%' }}
                    icon={snackbarSeverity === 'success' ? '✅' : '❌'}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default HomePage;
