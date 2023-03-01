import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { Box, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import 'moment/locale/fr'
moment.locale('fr')

function EventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/event/${id}`)
            .then(res => setEvent(res.data))
            .catch(err => console.error(err));
    }, [id]);

    return (
        <div>
            <Container maxWidth="lg" >
                <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        {event.title}
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" component="p" sx={{ marginBottom: 10 }}>
                        {event.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={event.image} alt="img de l'évènement" style={{ width: "300", height: "300" }} />
                    </Box>
                    <Typography variant="h3" align="left" color="text.primary" component="p">
                        Informations
                    </Typography>
                    <Grid spacing={5}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" component="h5">Pays: {event.country}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" component="h5">Ville: {event.city}</Typography>
                        </Grid>
                        <Typography variant="h5" component="h5">Theme: {event.theme}</Typography>
                        <Typography variant="h5" component="h5">Date début: {moment(event.startDate).format('lll')}</Typography>
                        <Typography variant="h5" component="h5">Date fin: {moment(event.endDate).format('lll')}</Typography>
                        <Typography variant="h5" component="h5">Adresse: {event.location}</Typography>
                        <Typography variant="h5" component="h5">Intervenants: {event.speakers}</Typography>
                        <Typography variant="h5" component="h5">Prix: {event.price === 0 ? "Gratuit" : 0 + "€"}</Typography>
                        <Typography variant="h5" component="h5">lien du site:<Link href={event.ticketLink}>{event.ticketLink}</Link></Typography>
                    </Grid>
                </Container>
            </Container>
        </div >
    );
}

export default EventDetail;