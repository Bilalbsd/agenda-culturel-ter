import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, ButtonGroup, CardActionArea, Chip, FormControl, Grid, InputLabel, Select, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { NavLink } from 'react-router-dom';
import 'moment/locale/fr'
moment.locale('fr')


function EventsList() {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
    const [geolocationEnabled, setGeolocationEnabled] = useState(false);



    useEffect(() => {
        axios
            .get('http://localhost:5000/api/event')
            .then((res) => { setEvents(res.data); console.log(events, "events") })
            .catch((err) => console.error(err));

        if (navigator.geolocation) {
            setGeolocationEnabled(true);
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
        } else {
            setGeolocationEnabled(false);
        }
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

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const [sortOrder, setSortOrder] = useState("A venir");

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
            // const location = removeAccents(event.location.toLowerCase());
            // const description = removeAccents(event.description.toLowerCase());

            // Transformer la recherche en minuscules et sans accents
            const query = removeAccents(searchQuery.toLowerCase());

            // Rechercher le texte de la recherche dans les différents attributs inscrits
            return (
                title.indexOf(query) !== -1 ||
                country.indexOf(query) !== -1 ||
                city.indexOf(query) !== -1 ||
                theme.indexOf(query) !== -1 ||
                // location.indexOf(query) !== -1 ||
                // description.indexOf(query) !== -1 ||
                query.indexOf(title) !== -1 ||
                query.indexOf(country) !== -1 ||
                query.indexOf(city) !== -1 ||
                query.indexOf(theme) !== -1
                // query.indexOf(location) !== -1 ||
                // query.indexOf(description) !== -1
            );
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
                } else {
                    return true;
                }
            })
            .map((event) => {
                const lat1 = userLocation.lat;
                const lng1 = userLocation.lng;
                const lat2 = event.lat;
                const lng2 = event.lng;

                const R = 6371; // rayon de la Terre en km
                const dLat = ((lat2 - lat1) * Math.PI) / 180;
                const dLng = ((lng2 - lng1) * Math.PI) / 180;
                const a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos((lat1 * Math.PI) / 180) *
                    Math.cos((lat2 * Math.PI) / 180) *
                    Math.sin(dLng / 2) *
                    Math.sin(dLng / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const distance = R * c;

                return {
                    ...event,
                    distance,
                };
            })
            .sort((a, b) => a.distance - b.distance);

        return filteredAndSortedEvents;
    };

    const buttons = [
        {
            label: "Passé",
            value: "Passé",
        },
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

    // Recherche par filtre
    const [openFilter, setOpenFilter] = useState(false);
    const [valuesFilter, setValuesFilter] = useState([]);
    const [submitFilter, setSubmitFilter] = useState(false);

    useEffect(() => {
        setValuesFilter({
            title: '',
            country: '',
            city: '',
            theme: '',
            startDate: '',
            endDate: ''
        })
    }, []);

    const handleChangeFilter = (e) => {
        setValuesFilter({ ...valuesFilter, [e.target.name]: e.target.value });
    }

    function anotherFunction(events, filter, sortOrder) {
        const now = new Date();
        const filteredAndSortedEvents = events
            .filter(event => {
                const isTitleMatched = event.title.includes(filter.toLowerCase());
                const isCountryMatched = event.country.toLowerCase().includes(filter.toLowerCase());
                const isCityMatched = event.city.toLowerCase().includes(filter.toLowerCase());
                const isThemeMatched = event.theme.toLowerCase().includes(filter.toLowerCase());
                const isStartDateMatched = moment(event.startDate).isSameOrAfter(now);
                const isEndDateMatched = moment(event.endDate).isSameOrAfter(now);

                return isTitleMatched || isCountryMatched || isCityMatched || isThemeMatched || isStartDateMatched || isEndDateMatched;
            })
            .filter((event) => {
                const endDate = new Date(event.endDate);
                const startDate = new Date(event.startDate);

                console.log(endDate, "endDate");
                console.log(now, "now");

                if (sortOrder === "Passé") {
                    return endDate < now;
                } else if (sortOrder === "A venir") {
                    return endDate >= now;
                } else if (sortOrder === "Actuel") {
                    return startDate <= now && endDate >= now;
                } else {
                    return true;
                }
            })
            .map((event) => {
                const { lat: lat1, lng: lng1 } = userLocation;
                const { lat: lat2, lng: lng2 } = event;

                const R = 6371; // rayon de la Terre en km
                const dLat = ((lat2 - lat1) * Math.PI) / 180;
                const dLng = ((lng2 - lng1) * Math.PI) / 180;
                const a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos((lat1 * Math.PI) / 180) *
                    Math.cos((lat2 * Math.PI) / 180) *
                    Math.sin(dLng / 2) *
                    Math.sin(dLng / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const distance = R * c;

                return {
                    ...event,
                    distance,
                };
            })
            .sort((a, b) => a.distance - b.distance);

        return filteredAndSortedEvents;
    }


    let filteredAndSortedEvents;
    { submitFilter ? filteredAndSortedEvents = anotherFunction(events, valuesFilter, sortOrder) : filteredAndSortedEvents = filterAndSortEvents(events, searchQuery, sortOrder); }


    console.log(filteredAndSortedEvents, "filteredAndSorteeeeeeeeeeeeed")
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
                <Grid item xs={12} sm={9}>
                    <TextField
                        label="Recherche"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button onClick={() => openFilter ? setOpenFilter(false) : setOpenFilter(true)}>
                        Filtre
                    </Button>
                </Grid>
                {openFilter &&
                    <Grid style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField name="title" label="Titre" value={valuesFilter.title} onChange={handleChangeFilter} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="country" label="Pays" value={valuesFilter.country} onChange={handleChangeFilter} fullWidth />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField name="city" label="Ville" value={valuesFilter.city} onChange={handleChangeFilter} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl required fullWidth>
                                    <InputLabel htmlFor="event-theme-select">Thème</InputLabel>
                                    <Select native value={valuesFilter.theme ? valuesFilter.theme : valuesFilter.theme = " "} onChange={handleChangeFilter} inputProps={{ name: 'theme', id: 'event-theme-select' }}>
                                        <option aria-label="Choisir un événement" value="">Tous</option>
                                        <option value="Théâtre">Théâtre</option>
                                        <option value="Sport">Sport</option>
                                        <option value="Concert">Concert</option>
                                        <option value="Festival">Festival</option>
                                        <option value="Danse">Danse</option>
                                        <option value="Spectacle">Spectacle</option>
                                        <option value="Exposition">Exposition</option>
                                        <option value="Autre">Autre</option>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="startDate"
                                    label="Date de début"
                                    type="datetime-local"
                                    value={valuesFilter.startDate}
                                    onChange={handleChangeFilter}
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="endDate"
                                    label="Date de fin"
                                    type="datetime-local"
                                    value={valuesFilter.endDate}
                                    onChange={handleChangeFilter}
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Button variant="contained" onClick={() => { console.log(valuesFilter, "valuesFilter"); setSubmitFilter(true) }}>Rechercher</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="error" onClick={() => { setValuesFilter({ title: '', country: '', city: '', theme: '', startDate: '', endDate: '' }) }}>Effacer</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                }
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
                                                {event.title} - {navigator.geolocation ? Math.round(event.distance) + "km" : null}
                                            </Typography>
                                            <Typography gutterBottom variant="p" component="div" color="green">
                                                {event.inPromotion && "En promotion -" + event.promotionValue + "%"}
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
            </Container >
        </>
    );
}

export default EventsList;