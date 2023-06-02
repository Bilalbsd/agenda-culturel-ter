import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { Container } from '@mui/system';

function EventsList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_API_URL}/api/event`)
            .then((res) => setEvents(res.data))
            .catch((err) => console.error(err));
    }, []);

    const filteredEvents = events.filter((event) => {
        return moment(event.startDate).format('YYYY-MM-DD');
    });

    // Définir la longueur maximale pour la description
    const maxLength = 150;

    // Fonction pour raccourcir la description et ajouter "..."
    const shortenDescription = (description) => {
        if (description.length > maxLength) {
            return description.slice(0, maxLength).concat('...');
        }
        return description;
    };

    return (
        <div>
            <h2>Liste des Événements</h2>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    {filteredEvents.map((event) => (
                        <Grid item key={event._id} xs={12} sm={6} md={4}>
                            <span style={{ cursor: 'pointer' }}>
                                <Card sx={{ height: '100%' }} >
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={event.image}
                                            alt="image"
                                        />
                                    </CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {event.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {shortenDescription(event.description)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </span>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

export default EventsList;