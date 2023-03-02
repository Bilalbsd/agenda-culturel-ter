import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { SubscriptionContext } from '../../context/SubscriptionContext';




const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
];

export default function Review() {

    const { supPunctual, monthly, supMonthly, punctual } = React.useContext(SubscriptionContext);

    let products = [];

    if (monthly === true) {
        products =
            [
                {
                    name: 'Abonnement Mensuel',
                    desc: 'Populaire', price: '5€',
                },
                { name: 'Total', desc: '', price: '5€' }
            ];
    }

    if (supMonthly === true) {
        products =
            [
                {
                    name: 'Abonnement Mensuel Supérieur',
                    desc: 'Très Populaire', price: '15€',
                },
                { name: 'Total', desc: '', price: '15€' }
            ];
    }

    if (punctual === true) {
        products =
            [
                {
                    name: 'Abonnement Ponctuel',
                    desc: 'Populaire', price: '15€',
                },
                { name: 'Total', desc: '', price: '30€' }
            ];
    }

    if (supPunctual === true) {
        products =
            [
                {
                    name: 'Abonnement Ponctuel Supérieur',
                    desc: 'Très Populaire', price: '30€',
                },
                { name: 'Total', desc: '', price: '30€' }
            ];
    }


    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Récapitulatif de la commande
            </Typography>
            <List disablePadding>
                {products.map((product) => (
                    <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={product.name} secondary={product.desc} />
                        <Typography variant="subtitle1">{product.price}</Typography>

                    </ListItem>
                ))}
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Expédition
                    </Typography>
                    <Typography gutterBottom>John Smith</Typography>
                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Détails de paiement
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}