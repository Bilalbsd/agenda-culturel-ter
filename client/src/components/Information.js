import React from 'react';
import { Container, Typography, Grid, Button, Card, CardContent } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Presentation = () => {
    return (
        <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
            <Typography variant="h4" align="center" sx={{ marginBottom: '2rem' }}>
                Présentation Agenda Culturel et Sportif
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
                                Pour les créateurs d'événements
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                                Vous êtes organisateur d'événements culturels ou sportifs ? Notre plateforme vous permet de créer et de promouvoir vos événements auprès d'une audience locale ou nationale. Nous offrons 3 événements gratuits de base, mais vous pouvez souscrire à un abonnement pour en avoir plus.
                            </Typography>
                            <NavLink to="/create-event" style={{ textDecoration: 'none' }}>
                                <Button variant="contained" sx={{ marginBottom: '1rem' }}>
                                    Créer un événement
                                </Button>
                            </NavLink>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
                                Pour les utilisateurs lambdas
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                                Vous cherchez des événements culturels ou sportifs près de chez vous ? Notre plateforme vous permet de rechercher, de sauvegarder, de commenter et d'évaluer des événements dans votre région. Vous pouvez également ajouter des événements à votre agenda personnel et les mettre en favoris.
                            </Typography>
                            <NavLink to="/" style={{ textDecoration: 'none' }}>
                                <Button variant="contained" sx={{ marginBottom: '1rem' }}>
                                    Rechercher un événement
                                </Button>
                            </NavLink>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Presentation;
