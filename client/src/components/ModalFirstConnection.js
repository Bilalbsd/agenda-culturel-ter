import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { AuthContext } from '../context/AuthContext';
import Information from './Information';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { SubscriptionContext } from '../context/SubscriptionContext';
import axios from 'axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedDialogs() {

    const { userId, isAuthenticated, userFirstname, userLastname, userEmail, userRole, nbMaxEvent, firstConnection } = React.useContext(AuthContext);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    // S'affiche uniquement lorsque le nombre de jeton d'événement est dépassé.
    React.useEffect(() => {
        if (firstConnection === true) {
            handleClickOpen();
        }
    }, []);

    const handleClose = () => {
        setOpen(false);
        axios.put(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${userId}`, { firstConnection: false })
            .then(res => console.log(res));
    };

    // React.useEffect(() => {
    //     axios.put(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${userId}`, { firstConnection: false })
    //         .then(res => console.log(res));
    // }, []);

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Première connexion
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom component="h3" variant="h3">
                        Bienvenue, {userFirstname}
                    </Typography>
                    <br />
                    <Typography gutterBottom component="h5" variant="h5">
                        Il s'agit là de votre toute première connexion !
                    </Typography>
                    <Typography gutterBottom component="h5" variant="h5">
                        Par conséquent, nous allons vous présenter le site rapidement
                    </Typography>
                    <Information />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Fermer
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}