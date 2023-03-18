import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { Box, Grid, Typography, TextField, Rating, Button, IconButton, Avatar } from '@mui/material';
import { Container } from '@mui/system';
import 'moment/locale/fr';
import { AuthContext } from '../context/AuthContext';
import FavButton from "./FavButton";
import FavButton2 from "./FavButton2";
import TwitterIcon from '@mui/icons-material/Twitter';
import UserGroupList from './UserGroupList';
import FriendGroups from './FriendGroups';
import FriendGroupsList from './FriendGroupsList';
moment.locale('fr');

function EventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState({ comments: [] });

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);

    const [comments, setComments] = useState([]);

    const [averageRating, setAverageRating] = useState(0);


    const { userId, userRole, userFirstname, userLastname, isAuthenticated } = useContext(AuthContext);

    const encodedText = encodeURIComponent("Je partage cet événement incroyable !");
    const encodedUrl = encodeURIComponent(`http://localhost:5000/api/event/${id}`);
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;


    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/event/${id}`)
            .then(res => {
                setEvent(res.data);
                setComments(res.data.comments);
                console.log(event, "event");

                const ratings = res.data.comments.map(comment => comment.rating);
                console.log(ratings, "ratings");

                // Calculer la note moyenne
                const totalRating = ratings.reduce((total, rating) => total + rating, 0);
                const average = totalRating / ratings.length;
                console.log(totalRating, "totalRating");
                setAverageRating(average);
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

        // Input validation
        if (!comment || !rating || rating < 1 || rating > 5) {
            // Display an error message to the user
            console.error('Commentaire ou note invalide !');
            return;
        }

        const newComment = {
            rating: rating,
            commenterId: userId ? userId : "anonymous",
            commenterUsername: userFirstname ? userFirstname + ' ' + userLastname : " Anonyme",
            text: comment,
            timestamp: Date.now(),
        };

        axios
            .put(`http://localhost:5000/api/event/${id}`, {
                comments: [...comments, newComment]
            })
            .then(res => {
                setComments([...comments, newComment]);
                setRating(0);
                setComment('');

                const updatedEvent = { ...res.data, comments: res.data.comments };
                setEvent(updatedEvent);
                console.log(updatedEvent, "updated event");
            })
            .catch(err => {

                console.error(err);
                alert('Une erreur est survenue lors de l\'envoie du commentaire.');
            });
    };


    return (
        <div>
            <Container maxWidth="lg">
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
                        <img src={event.image} alt="img de l'évènement" style={{ width: "800px", height: "500px" }} />
                    </Box>
                    <Typography variant="h3" align="left" color="text.primary" component="p">
                        Informations
                    </Typography>
                    <Grid>
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
                        <Typography gutterBottom variant="h5" component="div" color="green">
                        {event.inPromotion && "En promotion -" + event.promotionValue + "%"}
                        </Typography>
                        <Typography variant="h5" component="h5">
                            Prix: {
                                event.inPromotion
                                    ? <span><span style={{ textDecoration: 'line-through' }}>{event.price}€</span> {event.discountedPrice}€</span>
                                    : event.price === 0
                                        ? "Gratuit"
                                        : `${event.price}€`
                            }
                        </Typography>

                        <Typography variant="h5" component="h5">lien du site:<Link href={event.ticketLink}>{event.ticketLink}</Link></Typography>
                    </Grid>

                    {isAuthenticated ? <FavButton /> : <FavButton2 event={event} />}

                    {/* <UserGroupList /> */}


                    <Box sx={{ width: '100%', mb: 5 }}>
                        {event.comments?.map(comment => (
                            <Box key={comment.timestamp} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar alt={comment.commenterUsername} src="/static/images/avatar/1.jpg" sx={{ mr: 2 }} />
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                        {comment.commenterUsername}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                                        {moment(comment.timestamp).fromNow()}
                                    </Typography>
                                    <Rating
                                        name="rating"
                                        value={comment.rating}
                                        readOnly
                                        size="large"
                                    />
                                    <Typography variant="body1">
                                        {comment.text}
                                    </Typography>
                                </Box>
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
                    <Grid item>
                        <Typography variant="h5" component="h5">Note moyenne : {averageRating ? averageRating.toFixed(1) : "Aucune évaluation"}</Typography>
                    </Grid>
                    <IconButton component="a" href={shareUrl} target="_blank" rel="noopener">
                        <TwitterIcon />
                    </IconButton>

                </Container>
            </Container >
        </div >
    );
}

export default EventDetail;