import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { Box, Grid, Typography, Button, Checkbox } from '@mui/material';
import { Container } from '@mui/system';
import 'moment/locale/fr'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { AuthContext } from '../context/AuthContext';
moment.locale('fr')

function EventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const [favorite, setFavorite] = useState(false);

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const { userId, userRole, nbMaxEvent, setNbMaxEvent } = useContext(AuthContext);


    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/event/${id}`)
            .then(res => setEvent(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const [favoriteEvents, setFavoriteEvents] = useState([]);

    // Récupérer les données de l'utilisateur à partir de l'API
    useEffect(() => {
        axios.get(`http://localhost:5000/api/user/${userId}`)
            .then(res => {
                setFavoriteEvents(res.data.favoriteEvents);
                if (res.data.favoriteEvents.includes(id)) {
                    setFavorite(true);
                } else {
                    setFavorite(false);
                }
            })
            .catch(err => console.error(err));
    }, [userId]);


    const handleFavorite = () => {
        if (!favoriteEvents.includes(id)) {
            axios.put(`http://localhost:5000/api/user/${userId}`, {
                favoriteEvents: [...favoriteEvents, id] // Concatenate the new id with the existing list
            })
                .then(res => { setFavorite(true); console.log(res) })
                .catch(err => console.error(err));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const comment = formData.get('comment');
        const rating = formData.get('rating');
        axios.put(`http://localhost:5000/api/event/${id}`, {
            comment: comment,
            rating: rating,
        })
            .then(res => {
                console.log(res, "res")
                // Mettre à jour l'état de l'événement pour inclure la nouvelle évaluation
                setEvent(prevEvent => {
                    const newComments = Array.isArray(prevEvent.comments) ? [...prevEvent.comments, res.data] : [res.data];
                    return {
                        ...prevEvent,
                        comment: newComments
                    }
                });
                console.log(res, "event")
            })
            .catch(err => console.error(err));
    };



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

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Checkbox
                            {...label}
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite />}
                            onClick={handleFavorite}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={favorite}
                            onClick={handleFavorite}
                        >
                            {favorite ? 'Favori ajouté' : 'Ajouter aux favoris'}
                        </Button>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Commentaire :
                            <textarea />
                        </label>
                        <label>
                            Evaluation :
                            <select>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </label>
                        <button type="submit">Envoyer</button>
                    </form>

                </Container>
            </Container>
        </div >
    );
}

export default EventDetail;
