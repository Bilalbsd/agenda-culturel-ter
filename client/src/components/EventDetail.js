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
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="flex-start"
                    justifyContent="flex-start"
                >
                    <Grid item xs={12} xm={6}>
                        <Typography variant="h2" component="h2">{event.title}</Typography>
                    </Grid>
                    <Typography variant="h5" component="h5">Pays: {event.country}</Typography>
                    <Typography variant="h5" component="h5">Ville: {event.city}</Typography>
                    <Typography variant="h5" component="h5">Theme: {event.theme}</Typography>
                    <Typography variant="h5" component="h5">Date début - Date fin: {moment(event.startDate).format('lll')} - {moment(event.endDate).format('lll')}</Typography>
                    <Typography variant="h5" component="h5">Adresse: {event.location}</Typography>
                    <Typography variant="h5" component="h5">Image: {<img src={event.image} alt="img de l'évènement" style={{ width: "150px", height: "150px" }} />}</Typography>
                    <Typography variant="h5" component="h5">Intervenants: {event.speakers}</Typography>
                    <Typography variant="h5" component="h5">Prix: {event.price === 0 ? "Gratuit" : 0 + "€"}</Typography>
                    <Typography variant="h5" component="h5">lien du site:<Link href={event.ticketLink}>{event.ticketLink}</Link></Typography>
                    <Typography variant="h5" component="h5">{event.description}</Typography>
                </Grid>
            </Container>
        </div >
    );
}

export default EventDetail;