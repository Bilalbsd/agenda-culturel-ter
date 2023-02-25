import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Chip, Grid, TextField } from '@mui/material';
import { Container } from '@mui/system';

function EventsList() {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/event')
            .then((res) => setEvents(res.data))
            .catch((err) => console.error(err));
    }, []);

    // Définir la longueur maximale pour la description
    const maxLength = 150;

    // Fonction pour raccourcir la description et ajouter "..."
    const shortenDescription = (description) => {
        if (description.length > maxLength) {
            return description.slice(0, maxLength).concat('...');
        }
        return description;
    };

    // Fonction pour retirer les accents d'une chaine de caractères
    const removeAccents = (str) => {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    };

    // Filtrer les événements selon la recherche
    const filteredEvents = events.filter((event) => {
        // Transformer les chaînes de caractères en minuscules et sans accents
        const title = removeAccents(event.title.toLowerCase());
        const country = removeAccents(event.country.toLowerCase());
        const city = removeAccents(event.city.toLowerCase());
        const theme = removeAccents(event.theme.toLowerCase());
        const location = removeAccents(event.location.toLowerCase());
        // const speakers = removeAccents(event.speakers.toLowerCase());
        const description = removeAccents(event.description.toLowerCase());

        // Transformer la recherche en minuscules et sans accents
        const query = removeAccents(searchQuery.toLowerCase());

        // Rechercher le texte de la recherche dans les différents attributs inscrits
        return title.includes(query) || country.includes(query) || city.includes(query) || theme.includes(query) || location.includes(query) || description.includes(query);
    });

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div>
            <h2>Liste des Événements</h2>
            <TextField
                label="Recherche"
                variant="outlined"
                margin="normal"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
            />
            
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    {filteredEvents.map((event) => (
                        <Grid item key={event._id} xs={12} sm={6} md={4}>
                            <span style={{ cursor: 'pointer' }}>
                                <Card sx={{ height: '100%' }}>
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
                                            <Chip label={moment(event.startDate).format('ll') + " - " + moment(event.startDate).format('ll')} color="primary" />
                                            <br />
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