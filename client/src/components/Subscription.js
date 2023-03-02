import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';
import { SubscriptionContext } from '../context/SubscriptionContext';

const tiers = [
  {
    title: 'Mensuel',
    // subheader: 'Most popular',
    price: '5',
    description: [
      '10 jetons de création',
      '2 GB of storage',
      'Help center access',
      'Email support',
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
      'Help center access',
      'Email support',
    ],
    buttonText: 'Choisir',
    buttonVariant: 'outlined',
  },
  {
    title: 'Ponctuel',
    // subheader: 'Most popular',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Choisir',
    buttonVariant: 'outlined',
  },
  {
    title: 'Ponctuel Supérieur',
    subheader: 'Très populaire',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Choisir',
    buttonVariant: 'outlined',
  },
];

function Subscription() {

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

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Abonnements
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Vous trouverez ici les différents types d'abonnement que nous proposons à nos créateurs d'événements.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
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
        </Grid>
      </Container>
    </React.Fragment>
  );
}
export default Subscription;