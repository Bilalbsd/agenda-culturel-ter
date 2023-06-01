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
import HelpIcon from '@mui/icons-material/Help';
import CircleIcon from '@mui/icons-material/Circle';
import LoginIcon from '@mui/icons-material/Login';
import { Badge, Modal } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';


function ResponsiveAppBar() {

    const { userId, userRole, userFirstname, picture, isAuthenticated } = React.useContext(AuthContext);

    const [nbMaxEvent, setNbMaxEvent] = React.useState(null);
    const [notifications, setNotifications] = React.useState([]);
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        try {
            axios.get(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${userId}`)
                .then(res => {
                    setUser(res.data);
                    setNotifications(res.data.notifications);
                })
        } catch (err) {
            console.log(err);
        }
    }, [user, notifications]);

    // console.log(notifications, "notifications");

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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
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

                    {!isAuthenticated && isSmallScreen &&
                        <>
                            <NavLink to="/agenda" style={{ textDecoration: 'none', color: 'white' }}>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" fontFamily="Roboto" fontWeight="bold">{"Mon agenda".toUpperCase()}</Typography>
                                </MenuItem>
                            </NavLink>
                            <NavLink to="/favorite" style={{ textDecoration: 'none', color: 'white' }}>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" fontFamily="Roboto" fontWeight="bold">{"Mes favoris".toUpperCase()}</Typography>
                                </MenuItem>
                            </NavLink>
                            <NavLink to="/group" style={{ textDecoration: 'none', color: 'white' }}>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" fontFamily="Roboto" fontWeight="bold">{"Groupes".toUpperCase()}</Typography>
                                </MenuItem>
                            </NavLink>
                        </>
                    }

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
                            <NavLink to="/agenda" style={{ textDecoration: 'none', color: 'white' }}>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" fontFamily="Roboto" fontWeight="bold">{"Mon agenda".toUpperCase()}</Typography>
                                </MenuItem>
                            </NavLink>
                            <NavLink to="/favorite" style={{ textDecoration: 'none', color: 'white' }}>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" fontFamily="Roboto" fontWeight="bold">{"Mes favoris".toUpperCase()}</Typography>
                                </MenuItem>
                            </NavLink>
                            <NavLink to="/group" style={{ textDecoration: 'none', color: 'white' }}>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" fontFamily="Roboto" fontWeight="bold">{"Groupes".toUpperCase()}</Typography>
                                </MenuItem>
                            </NavLink>
                        </>
                    }

                    {isAuthenticated && userRole === "manager" && isSmallScreen &&
                        <>
                            <NavLink to="/user-management" style={{ textDecoration: 'none', color: 'white' }}>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" fontFamily="Roboto" fontWeight="bold">{"Gestionnaire d'Utilisateur".toUpperCase()}</Typography>
                                </MenuItem>
                            </NavLink>
                            <NavLink to="/event-management" style={{ textDecoration: 'none', color: 'white' }}>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" fontFamily="Roboto" fontWeight="bold">{"Gestionnaire d'Événement".toUpperCase()}</Typography>
                                </MenuItem>
                            </NavLink>
                            <NavLink to="/statistic" style={{ textDecoration: 'none', color: 'white' }}>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" fontFamily="Roboto" fontWeight="bold">{"Statistiques".toUpperCase()}</Typography>
                                </MenuItem>
                            </NavLink>
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

                            {!isAuthenticated &&
                                <>
                                    <NavLink to="/agenda" style={{ textDecoration: 'none', color: 'black' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{"Mon agenda"}</Typography>
                                        </MenuItem>
                                    </NavLink>
                                    <NavLink to="/favorite" style={{ textDecoration: 'none', color: 'black' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{"Mes favoris"}</Typography>
                                        </MenuItem>
                                    </NavLink>
                                    <NavLink to="/group" style={{ textDecoration: 'none', color: 'black' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{"Groupes"}</Typography>
                                        </MenuItem>
                                    </NavLink>
                                </>
                            }

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
                                    <NavLink to="/agenda" style={{ textDecoration: 'none', color: 'black' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{"Mon agenda"}</Typography>
                                        </MenuItem>
                                    </NavLink>
                                    <NavLink to="/favorite" style={{ textDecoration: 'none', color: 'black' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{"Mes favoris"}</Typography>
                                        </MenuItem>
                                    </NavLink>
                                    <NavLink to="/group" style={{ textDecoration: 'none', color: 'black' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{"Groupes"}</Typography>
                                        </MenuItem>
                                    </NavLink>
                                </>
                            }

                            {isAuthenticated && userRole === "manager" &&
                                <>
                                    <NavLink to="/user-management" style={{ textDecoration: 'none', color: 'black' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{"Gestionnaire d'Utilisateur"}</Typography>
                                        </MenuItem>
                                    </NavLink>
                                    <NavLink to="/event-management" style={{ textDecoration: 'none', color: 'black' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{"Gestionnaire d'Événement"}</Typography>
                                        </MenuItem>
                                    </NavLink>
                                    <NavLink to="/statistic" style={{ textDecoration: 'none', color: 'black' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{"Statistiques"}</Typography>
                                        </MenuItem>
                                    </NavLink>
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
                    </Box>

                    <MenuItem>
                        <IconButton
                            size="large"
                            aria-label="presentation"
                            color="inherit"
                            marginRight="30px"
                        >
                            <NavLink to="/information" style={{ textDecoration: 'none', color: 'white' }}>
                                <Badge sx={{ p: 0, }}>
                                    <HelpIcon />
                                </Badge>
                            </NavLink>
                        </IconButton>
                    </MenuItem>

                    <MenuItem>
                        <IconButton
                            size="large"
                            aria-label="show new notifications"
                            color="inherit"
                            onClick={handleOpen}
                        >
                            {isAuthenticated &&
                                <NavLink to="/notification" style={{ textDecoration: 'none', color: 'white' }}>
                                    <Badge badgeContent={notifications.length} color="error">
                                        <NotificationsIcon />
                                    </Badge>
                                </NavLink>
                            }
                            {!isAuthenticated &&
                                <NotificationsIcon />
                            }
                        </IconButton>
                        {!isAuthenticated &&
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Restez informé
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Vous devez être connecté pour profiter de cette fonctionnalité !
                                    </Typography>
                                </Box>
                            </Modal>
                        }
                    </MenuItem>

                    {isAuthenticated ?

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginLeft: 3 }}>
                                    {user.picture !== "null" ? <Avatar alt={userFirstname} src={user.picture} /> : <Avatar alt={userFirstname} src="/static/images/avatar/1.jpg" />}
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
                                <NavLink to="/profil" style={{ textDecoration: 'none', color: 'black' }}>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">Profil</Typography>
                                    </MenuItem>
                                </NavLink>
                                <NavLink to="/favorite" style={{ textDecoration: 'none', color: 'black' }}>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">Favoris</Typography>
                                    </MenuItem>
                                </NavLink>
                                <div onClick={() => { localStorage.removeItem('token'); window.location.href = "/" }}>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" color="red">Déconnexion</Typography>
                                    </MenuItem>
                                </div>
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