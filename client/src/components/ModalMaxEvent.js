import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../context/AuthContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedDialogs() {

    const { userId, isAuthenticated, userFirstname, userLastname, userEmail, userRole, nbMaxEvent } = React.useContext(AuthContext);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    // S'affiche uniquement lorsque le nombre de jeton d'événement est dépassé.
    React.useEffect(() => {
        if (nbMaxEvent === 0) {
            handleClickOpen();
        }
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Nombre d'événement maximum atteint
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom component="h3" variant="h3">
                        Re, {userFirstname}
                    </Typography>
                    <br />
                    <Typography gutterBottom component="h5" variant="h5">
                        Suite à votre dernière connexion,
                        nous avons remarqué que vous n'êtes plus en possession d'un nombre suffisant de jetons de création d'événements.
                    </Typography>
                    <Typography gutterBottom component="h5" variant="h5">
                        Par conséquent, nous vous invitons cordialement à vous rendre sur notre page d'abonnement
                        afin de souscrire à un abonnement vous permettant de bénéficier à nouveau de jetons, ainsi que d'autres avantages.
                    </Typography>
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