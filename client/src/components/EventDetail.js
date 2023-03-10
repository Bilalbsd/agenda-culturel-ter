import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { Box, Grid, Typography, TextField, Rating, Button } from '@mui/material';
import { Container } from '@mui/system';
import 'moment/locale/fr';
import { AuthContext } from '../context/AuthContext';
import FavButton from "./FavButton";
moment.locale('fr');

function EventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState({ comments: [] });

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);

    const [comments, setComments] = useState([]);
    const [ratings, setRatings] = useState([]);


    const { userId, userRole, firstname } = useContext(AuthContext);


    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/event/${id}`)
            .then(res => {
                setEvent(res.data);
                setComments(res.data.comments);
                setRatings(res.data.rating);
                console.log(event, "event")
            })
            .catch(err => console.error(err));
    }, [id]);


    const handleRatingChange = (event, value) => {
        setRating(value);
    };

    const handleCommentChange = event => {
        setComment(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        const newComment = {
            rating: rating,
            commenterId: userId ? userId : "anonymous",
            commenterUsername: firstname ? firstname : "Anonymous",
            text: comment,
            timestamp: Date.now(),
        };
        // Ajouter le nouveau commentaire à la liste des commentaires
        setComments([...comments, newComment]);
        // Envoyer la requête au serveur pour mettre à jour l'événement avec les nouveaux commentaires
        axios
            .put(`http://localhost:5000/api/event/${id}`, {
                comments: [...comments, newComment]
            })
            .then(res => {
                // Mettre à jour l'état de l'événement avec les commentaires mis à jour
                const updatedEvent = { ...res.data, comments: res.data.comments };
                setEvent(updatedEvent);
                console.log(updatedEvent, "updated event");
            })
            .catch(err => console.error(err));
        // Réinitialiser l'état de la note et du commentaire
        setRating(0);
        setComment('');
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

                    <FavButton />

                    <Box sx={{ width: '100%', mb: 5 }}>
                        {event.comments?.map(comment => (
                            <Box key={comment.timestamp} sx={{ mb: 2 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    {comment.commenterUsername}
                                </Typography>
                                <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                                    {moment(comment.timestamp).fromNow()}
                                </Typography>
                                <Rating
                                    name="rating"
                                    value={comment.rating}
                                    disabled
                                    size="large"
                                />
                                <Typography variant="body1">
                                    {comment.text}
                                </Typography>
                            </Box>
                        )) ?? []}
                    </Box>


                    <Grid item>
                        <Rating
                            name="rating"
                            value={rating}
                            onChange={handleRatingChange}
                            size="large"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="comment"
                            name="comment"
                            label="Commentaire"
                            multiline
                            maxRows={4}
                            value={comment}
                            onChange={handleCommentChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Ajouter
                        </Button>
                    </Grid>

                </Container>
            </Container >
        </div >
    );
}

export default EventDetail;