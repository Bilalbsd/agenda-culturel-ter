import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CircleIcon from '@mui/icons-material/Circle';
import LoginIcon from '@mui/icons-material/Login';
import { Badge } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';


function ResponsiveAppBar() {

    const { userId, userRole, userFirstname, isAuthenticated } = React.useContext(AuthContext);

    const [nbMaxEvent, setNbMaxEvent] = React.useState(null);

    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/user/${userId}`);
                setNbMaxEvent(res.data.nbMaxEvent); // mettre à jour la valeur de nbMaxEvent
            } catch (err) {
                console.log(err);
            }
        };
        fetchUser();
    }, [userId, nbMaxEvent]); // déclencher l'effet à chaque changement de userId


    let pages = []

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const isSmallScreen = useMediaQuery('(min-width: 900px)');

    return (
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
            <Container maxWidth="xl">

                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                    <NavLink to="/" style={{ textDecoration: 'none', color: 'white' }} >
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                    </NavLink>

                    {isAuthenticated && userRole === "creator" && isSmallScreen &&
                        <>
                            <NavLink to="/create-event" style={{ textDecoration: 'none', color: 'white' }}>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" fontFamily="Roboto" fontWeight="bold">{"Créer un événement".toUpperCase()}</Typography>
                                </MenuItem>
                            </NavLink>
                            <NavLink to="/personal-events" style={{ textDecoration: 'none', color: 'white' }}>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" fontFamily="Roboto" fontWeight="bold">{"Mes événements".toUpperCase()}</Typography>
                                </MenuItem>
                            </NavLink>
                            <NavLink to="/pricing" style={{ textDecoration: 'none', color: 'white' }}>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" fontFamily="Roboto" fontWeight="bold">{"Abonnements".toUpperCase()}</Typography>
                                </MenuItem>
                            </NavLink>
                        </>
                    }

                    {isAuthenticated && userRole === "registered" && isSmallScreen &&
                        <>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Mon agenda</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Mes favoris</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Abonnements</Typography>
                            </MenuItem>
                        </>
                    }

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {/* {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))} */}
                            {/* {
                                isAuthenticated
                                    ? userRole === "creator"
                                        ?
                                        <div>
                                            <NavLink to="/profil" style={{ textDecoration: 'none' }}>
                                                <MenuItem key="1" onClick={handleCloseNavMenu}>
                                                    <Typography textAlign="center">Créer un événement</Typography>
                                                </MenuItem>
                                            </NavLink>
                                            <NavLink to="/compte" style={{ textDecoration: 'none' }}>
                                                <MenuItem onClick={handleCloseNavMenu}>
                                                    <Typography textAlign="center">Mes événements</Typography>
                                                </MenuItem>
                                            </NavLink>
                                        </div>
                                        : userRole === "registered"
                                            ? pages = ['Mon agenda', 'Mes favoris', 'Abonnements']
                                            : pages = []
                                    : pages = []
                            } */}


                            {isAuthenticated && userRole === "creator" &&
                                <>
                                    <NavLink to="/create-event" style={{ textDecoration: 'none', color: 'black' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">Créer un événement</Typography>
                                        </MenuItem>
                                    </NavLink>
                                    <NavLink to="/personal-events" style={{ textDecoration: 'none', color: 'black' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">Mes événements</Typography>
                                        </MenuItem>
                                    </NavLink>
                                    <NavLink to="/pricing" style={{ textDecoration: 'none', color: 'black' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">Abonnements</Typography>
                                        </MenuItem>
                                    </NavLink>
                                </>
                            }

                            {isAuthenticated && userRole === "registered" &&
                                <>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">Mon agenda</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">Mes favoris</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">Abonnements</Typography>
                                    </MenuItem>
                                </>
                            }

                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))} */}


                    </Box>
                    <MenuItem>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={nbMaxEvent} color="error">
                                <CircleIcon />
                            </Badge>
                        </IconButton>
                        {/* <p>Événements restants</p> */}
                    </MenuItem>
                    <MenuItem>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        {/* <p>Notifications</p> */}
                    </MenuItem>

                    {isAuthenticated ?

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginLeft: 3 }}>
                                    <Avatar alt={userFirstname} src="/static/images/avatar/1.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <NavLink to="/profil" style={{ textDecoration: 'none' }}>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">Profil</Typography>
                                    </MenuItem>
                                </NavLink>
                                <NavLink to="/compte" style={{ textDecoration: 'none' }}>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">Compte</Typography>
                                    </MenuItem>
                                </NavLink>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}>Déconnexion</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        : <MenuItem>
                            <NavLink to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                                {/* <LoginIcon /> */}
                                {/* <h4>Se connecter</h4> */}
                                Se connecter
                            </NavLink>
                        </MenuItem>}
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default ResponsiveAppBar;