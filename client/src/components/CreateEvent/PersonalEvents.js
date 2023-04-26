import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import DeleteIcon from '@mui/icons-material/Delete';
import { CardActionArea, Chip, Fab, Grid, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { AuthContext } from '../../context/AuthContext';
import { NavLink, useParams } from 'react-router-dom';

function PersonalEvents() {
    const { userId, userRole, nbMaxEvent, setNbMaxEvent } = useContext(AuthContext);

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

    const filteredEvents = events.filter((event) => {
        // Vérifier si l'utilisateur connecté est le créateur de l'événement
        const isCreator = event.creator === userId;
        console.log(isCreator, "isCreator")

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
        return isCreator && (title.includes(query) || country.includes(query) || city.includes(query) || theme.includes(query) || location.includes(query) || description.includes(query));
    });


    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5000/api/event/${id}`)
            .then(res => {
                setEvents(events.filter(elem => elem._id !== id));
                console.log(res)
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <Container maxWidth="lg">
                <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Liste des vos événements
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" component="p">
                        Vous trouverez ici les différents événements que vous avez créé.
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
                                            <Chip label={moment(event.startDate).format('ll') + " - " + moment(event.endDate).format('ll')} sx={{ marginBottom: 1 }} />
                                            <br />
                                            <div style={{ display: 'flex', justifyContent: 'center', marginRight: '30px' }}>
                                                <NavLink to={`/edit-event/${event._id}`} style={{ textDecoration: 'none', color: 'grey' }} >
                                                    <Fab aria-label="edit" size="medium" sx={{ marginLeft: 3 }}>
                                                        <EditIcon />
                                                    </Fab>
                                                </NavLink>
                                                <NavLink to={`/add-advert/${event._id}`} style={{ textDecoration: 'none', color: 'grey' }} >
                                                    <Fab aria-label="edit" size="medium" sx={{ marginLeft: 3 }}>
                                                        <AddBusinessIcon />
                                                    </Fab>
                                                </NavLink>
                                                <Fab aria-label="delete" size="medium" color="error" sx={{ marginLeft: 3 }} onClick={() => handleDelete(event._id)}>
                                                    <DeleteIcon />
                                                </Fab>
                                            </div>

                                            {/* <br /> <br />
                                            {shortenDescription(event.description)} */}
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

export default PersonalEvents;