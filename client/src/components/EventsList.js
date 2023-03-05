import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, ButtonGroup, CardActionArea, Checkbox, Chip, Grid, Paper, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { NavLink } from 'react-router-dom';

import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

import 'moment/locale/fr';
moment.locale('fr')

function EventsList() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/event')
            .then((res) => setEvents(res.data))
            .catch((err) => console.error(err));
    }, []);

    const apiKey = "AIzaSyBvGBV9DUig0t9hvtFy4YcTrouE8S22lQM";

    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => {
                console.error(error);
            }
        );
    }, []);

    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        const earthRadius = 6371; // en km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c;
        return distance;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    const filterAndSortEvents = (events, searchQuery, sortOrder, userLocation) => {
        const now = new Date();

        const sortedEvents = events
            .map((event) => {
                const distance = getDistanceFromLatLonInKm(
                    userLocation.lat,
                    userLocation.lng,
                    event.coords1,
                    event.coords2
                );
                return {
                    ...event,
                    distance,
                };
            })
            .sort((a, b) => a.distance + b.distance);

        return sortedEvents.filter((event) => {
            // Transformer les chaînes de caractères en minuscules et sans accents
            const title = removeAccents(event.title.toLowerCase());
            const country = removeAccents(event.country.toLowerCase());
            const city = removeAccents(event.city.toLowerCase());
            const theme = removeAccents(event.theme.toLowerCase());
            const location = removeAccents(event.location.toLowerCase());
            const description = removeAccents(event.description.toLowerCase());

            // Transformer la recherche en minuscules et sans accents
            const query = removeAccents(searchQuery.toLowerCase());

            // Rechercher le texte de la recherche dans les différents attributs inscrits
            return title.includes(query) || country.includes(query) || city.includes(query) || theme.includes(query) || location.includes(query) || description.includes(query);
        })
            .filter((event) => {
                const endDate = new Date(event.endDate);
                const startDate = new Date(event.startDate);

                if (sortOrder === "Passé") {
                    return endDate < now;
                } else if (sortOrder === "A venir") {
                    return endDate >= now;
                } else if (sortOrder === "Actuel") {
                    return startDate <= now && endDate >= now;
                }
                else {
                    return true;
                }
            });
    };



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

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const [sortOrder, setSortOrder] = useState("A venir");

    const handleSort = (order) => {
        setSortOrder(order);
    };

    const filteredAndSortedEvents = filterAndSortEvents(events, searchQuery, sortOrder, userLocation);

    // const filteredAndSortedEvents = filterAndSortEvents(events, searchQuery, sortOrder);

    const buttons = [
        {
            label: "Passé",
            value: "Passé",
        },
        // {
        //     label: "Actuel",
        //     value: "Actuel",
        // },
        {
            label: "A venir",
            value: "A venir",
        },
        {
            label: "Tous",
            value: "Tous",
        },
    ].map((button) => (
        <Button
            key={button.value}
            variant={sortOrder === button.value ? "primary" : "outline-primary"}
            onClick={() => handleSort(button.value)}
        >
            {button.label}
        </Button>
    ));

    return (
        <>
            <Container maxWidth="lg">
                <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Liste des événements
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" component="p">
                        Vous trouverez ici les différents événements que nous proposons.
                    </Typography>
                </Container>
                <TextField
                    label="Recherche"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <br /> <br /> <br />
                <ButtonGroup size="large" aria-label="large button group">
                    {buttons}
                </ButtonGroup>
                <Grid container spacing={2}>
                    {filteredAndSortedEvents.map((event) => (
                        <Grid item key={event._id} xs={12} sm={6} md={4}>
                            <NavLink to={`/events/${event._id}`} style={{ textDecoration: 'none' }}>
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
                                                <Chip label={moment(event.startDate).format('ll') + " - " + moment(event.endDate).format('ll')} sx={{ marginBottom: 1 }} />
                                                <br />
                                                {shortenDescription(event.description)}
                                            </Typography>
                                            <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />                                        </CardContent>
                                    </Card>
                                </span>
                            </NavLink>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}

export default EventsList;