import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { SubscriptionContext } from '../../context/SubscriptionContext';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import moment from "moment";

const steps = ['Adresse de livraison', 'Détails de paiement', 'Vérifiez votre commande'];



function getStepContent(step) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}



export default function Checkout() {

    const { userId, userRole, } = React.useContext(AuthContext);

    const { supPunctual, monthly, supMonthly, punctual } = React.useContext(SubscriptionContext);

    const [activeStep, setActiveStep] = React.useState(0);

    const [actualSubscription, setActualSubscription] = React.useState("free");

    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        try {
            axios.get(`http://localhost:3000/api/user`)
                .then(res => setUser(res.data));
        } catch (err) {
            console.error(err);
        }
    });

    const [nbMaxEvent, setNbMaxEvent] = React.useState(0);

    React.useEffect(() => {
        axios.get(`http://localhost:5000/api/user/${userId}`)
            .then(res => setNbMaxEvent(res.data.nbMaxEvent));
    }, [nbMaxEvent]);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleSubscription = async () => {
        let nbMaxEventToAdd = 0;
        let actualSubscription = "free";
        let subscriptionExpiration = null;

        if (monthly) {
            actualSubscription = "mensual";
            nbMaxEventToAdd = 10;
            subscriptionExpiration = moment().add(1, 'M');
        } else if (punctual) {
            actualSubscription = "punctual";
            nbMaxEventToAdd = 10;
        } else if (supMonthly) {
            actualSubscription = "supmensual";
            nbMaxEventToAdd = 30;
            subscriptionExpiration = moment().add(1, 'M');
        } else if (supPunctual) {
            actualSubscription = "suppunctual";
            nbMaxEventToAdd = 30;
        }

        if (actualSubscription !== "free") {
            try {
                const res = await axios.put(`http://localhost:5000/api/user/${userId}`, {
                    subscription: actualSubscription,
                    nbMaxEvent: nbMaxEvent + nbMaxEventToAdd,
                    subscriptionExpiration: subscriptionExpiration?.toDate() || null,
                });
                console.log(res);
                handleNext();

                if (user.subscriptionExpiration) {
                    const remainingTime = moment.duration(subscriptionExpiration.diff(moment()));
                    if (remainingTime.asMilliseconds() > 0) {
                        setTimeout(async () => {
                            const freeRes = await axios.put(
                                `http://localhost:5000/api/user/${userId}`,
                                {
                                    subscription: "free",
                                    nbMaxEvent: 5,
                                    subscriptionExpiration: null,
                                }
                            );
                            console.log(freeRes);
                        }, remainingTime.asMilliseconds());
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
    };


    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">
                    Commande
                </Typography>
                <Typography component="h1" variant="h4" align="center">
                    {monthly ? "Mensuel" : null}
                    {punctual ? "Ponctuel" : null}
                    {supMonthly ? "Mensuel supérieur" : null}
                    {supPunctual ? "Ponctuel supérieur" : null}
                </Typography>
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                            Nous vous remercions de votre commande.
                        </Typography>
                        <Typography variant="subtitle1">
                            Votre numéro de commande est #2001539.
                            Nous avons envoyé votre confirmation de commande par e-mail.
                            Votre abonnement effet immédiatement !
                        </Typography>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {getStepContent(activeStep)}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                    Retour
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                onClick={activeStep === steps.length - 1 ? handleSubscription : handleNext}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                {activeStep === steps.length - 1 ? 'Passer la commande' : 'Suivant'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Paper>
        </Container>
    );
}