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

const tiers = [
    {
        title: 'Mensuel',
        // subheader: 'Most popular',
        price: '5',
        description: [
            '10 jetons de création',
            'Durée de 30 jours'
        ],
        buttonText: 'Choisir',
        buttonVariant: 'outlined',
    },
    {
        title: 'Mensuel Supérieur',
        subheader: 'Très populaire',
        price: '15',
        description: [
            '30 jetons de création',
            'Mettre en avant (publicité)',
            'Durée de 30 jours'
        ],
        buttonText: 'Choisir',
        buttonVariant: 'outlined',
    },
    {
        title: 'Ponctuel',
        // subheader: 'Most popular',
        price: '15',
        description: [
            '10 jetons de création',
        ],
        buttonText: 'Choisir',
        buttonVariant: 'outlined',
    },
    {
        title: 'Ponctuel Supérieur',
        subheader: 'Très populaire',
        price: '30',
        description: [
            '50 jetons de création',
            'Mettre en avant (publicité)',
        ],
        buttonText: 'Choisir',
        buttonVariant: 'outlined',
    },
];

export default function CustomizedDialogs() {

    const { userId, isAuthenticated, userFirstname, userLastname, userEmail, userRole, nbMaxEvent } = React.useContext(AuthContext);


    const { supPunctual, monthly, supMonthly, punctual, setSupPunctual, setMonthly, setSupMonthly, setPunctual } = React.useContext(SubscriptionContext);

    const handleSubscriptionSelect = (subscription) => {
        // setSelectedSubscription(subscription);
        if (subscription.title === "Mensuel") {
            setMonthly(true)
            setSupMonthly(false)
            setPunctual(false)
            setSupPunctual(false)
        }
        if (subscription.title === "Mensuel Supérieur") {
            setSupMonthly(true)
            setMonthly(false)
            setPunctual(false)
            setSupPunctual(false)
        }
        if (subscription.title === "Ponctuel") {
            setPunctual(true)
            setMonthly(false)
            setSupMonthly(false)
            setSupPunctual(false)
        }
        if (subscription.title === "Ponctuel Supérieur") {
            setSupPunctual(true)
            setMonthly(false)
            setSupMonthly(false)
            setPunctual(false)
        }
    };

    // const [nbMaxEvent, setNbMaxEvent] = React.useState(null);

    // React.useEffect(() => {
    //     axios.get(`http://localhost:5000/api/user/${userId}`)
    //         .then(res => setNbMaxEvent(res.data.nbMaxEvent));
    // }, []);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    // S'affiche uniquement lorsque le nombre de jeton d'événement est dépassé.
    React.useEffect(() => {
        if (isAuthenticated && nbMaxEvent === 0) {
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
                    <br />
                    {tiers.map((tier) => (
                        <Grid
                            item
                            key={tier.title}
                            xs={12}
                            md={6}
                        >
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}

                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            mb: 2,
                                        }}
                                    >
                                        <Typography component="h2" variant="h3" color="text.primary">
                                            {tier.price}€
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            {tier.title === 'Mensuel' || tier.title === 'Mensuel Supérieur' ? '/mois' : ''}
                                        </Typography>
                                    </Box>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <NavLink to={`/payment`} style={{ textDecoration: 'none' }}>
                                    <CardActions>
                                        <Button
                                            fullWidth
                                            variant={tier.buttonVariant}
                                            onClick={() => handleSubscriptionSelect(tier)}
                                        >
                                            {tier.buttonText}
                                        </Button>
                                    </CardActions>
                                </NavLink>
                            </Card>
                        </Grid>
                    ))}
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