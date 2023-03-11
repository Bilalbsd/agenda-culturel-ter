import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, ButtonGroup, CardActionArea, Chip, Grid, Paper, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { NavLink } from 'react-router-dom';

import 'moment/locale/fr'
import { AuthContext } from '../context/AuthContext';
moment.locale('fr')

function Favorite() {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [favoriteIds, setFavoriteIds] = useState('');

    const { userId, userRole, nbMaxEvent, setNbMaxEvent, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                let favorites = [];
                let eventsRes = await axios.get('http://localhost:5000/api/event');

                if (isAuthenticated) {
                    const res = await axios.get(`http://localhost:5000/api/user/${userId}`);
                    favorites = res.data.favoriteEvents;
                } else {
                    favorites = localStorage.getItem("favorites") || [];
                }

                // Filter events based on favoriteIds
                const favoriteEvents = eventsRes.data.filter(event => favorites.includes(event._id));

                // Set the state with filtered events
                setEvents(favoriteEvents);
                setFavoriteIds(favorites);
            } catch (err) {
                console.error(err);
            }
        };

        fetchFavorites();
    }, [userId, isAuthenticated]);


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

    const [sortOrder, setSortOrder] = useState("Tous");

    const handleSort = (order) => {
        setSortOrder(order);
    };

    const filterAndSortEvents = (events, searchQuery, sortOrder) => {
        const now = new Date();

        return events.filter((event) => {
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

    const filteredAndSortedEvents = filterAndSortEvents(events, searchQuery, sortOrder);

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
                        Mes Favoris
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" component="p">
                        Retrouvez tous les événements que vous avez mis en favoris !
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
                                        </CardContent>
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

export default Favorite;