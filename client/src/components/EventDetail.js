import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { Box, Grid, Typography, TextField, Rating, Button, IconButton, Avatar, List, Card, CardContent } from '@mui/material';
import { Container } from '@mui/system';
import 'moment/locale/fr';
import { AuthContext } from '../context/AuthContext';
import AgendaButton from "./AgendaButton";
import AgendaButton2 from "./AgendaButton2";
import FavButton from "./FavButton";
import FavButton2 from "./FavButton2";
import TwitterIcon from '@mui/icons-material/Twitter';
import UserGroupList from './UserGroupList';
import FriendGroups from './FriendGroups';
import FriendGroupsList from './FriendGroupsList';

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

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
            commenterUsername: userFirstname ? userFirstname + ' ' + userLastname : "Anonyme",
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

    useEffect(() => {
        const intervalId = setInterval(() => {
            setEvent(prevEvent => {
                if (prevEvent.inPromotion && prevEvent.promotionHasExpiration) {
                    const remainingTime = moment.duration(moment(prevEvent.promotionExpirationDate).diff(moment()));
                    if (remainingTime <= 0) { // vérifie si la promotion est terminée
                        axios.put(`http://localhost:5000/api/event/${id}`, { inPromotion: false })
                            .then(res => {
                                setEvent(prevEvent => ({ ...prevEvent, inPromotion: false }));
                            })
                            .catch(err => console.error(err));
                        return prevEvent;
                    } else {
                        return { ...prevEvent, remainingTime };
                    }
                } else {
                    return prevEvent;
                }
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [id]);

    const CLE_API = "AIzaSyBvGBV9DUig0t9hvtFy4YcTrouE8S22lQM";

    const [initialCoords, setInitialCoords] = useState(null);
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (event.lat && event.lng) {
            setInitialCoords([event.lat, event.lng]);
        }
    }, [event.lat, event.lng]);

    console.log(initialCoords, "initialCoords")

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${CLE_API}&libraries=places`;
        script.onload = () => {
            const map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: initialCoords[0], lng: initialCoords[1] },
                zoom: 15,
            });
            if (map && initialCoords) {
                new window.google.maps.Marker({
                    position: { lat: initialCoords[0], lng: initialCoords[1] },
                    map: map,
                });
            }

            setMap(map);
        };
        document.body.appendChild(script);
    }, [initialCoords]);

    const [state, setState] = useState([
        {
            startDate: moment(event.startDate).toDate(),
            endDate: moment(event.endDate).toDate(),
            key: 'selection'
        }
    ]);

    // console.log(moment(event.promotionExpirationDate).fromNow(), "event.promotionExpirationDate");


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
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            {isAuthenticated ? <FavButton /> : <FavButton2 event={event} />}
                        </Grid>
                        <Grid item>
                            {isAuthenticated ? <AgendaButton /> : <AgendaButton2 event={event} />}
                        </Grid>
                    </Grid>

                    <Typography
                        component="h3"
                        variant="h3"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Informations
                    </Typography>
                    <Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" component="h5">Pays: {event.country}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" component="h5">Ville: {event.city}</Typography>
                        </Grid>
                        <Typography variant="h5" component="h5">Adresse: {event.location}</Typography>
                        <Grid item xs={12}>
                            <div id="map" style={{ height: "400px", width: "100%" }}></div>
                        </Grid>
                        <Typography variant="h5" component="h5">Theme: {event.theme}</Typography>
                        <Typography variant="h5" component="h5">Date début: {moment(event.startDate).format('lll')}</Typography>
                        <Typography variant="h5" component="h5">Date fin: {moment(event.endDate).format('lll')}</Typography>

                        {/* <h1>{event.title}</h1>
                        {moment &&
                            <DateRangePicker
                                startDate={moment(event.startDate).format('MM/DD/YYYY')}
                                endDate={moment(event.endDate).format('MM/DD/YYYY')}
                                readOnly={true}
                                readOnlyInputs={true}
                            />
                        } */}

                        {/* <DateRange
                            editableDateInputs={true}
                            moveRangeOnFirstSelection={false}
                            ranges={state}
                        /> */}

                        {event.speaker && <Typography variant="h5" component="h5">Intervenants: {event.speaker}</Typography>}
                        {event.speakerPresentation && <Typography variant="h5" component="h5">Présentation des Intervenants: {event.speakerPresentation}</Typography>}
                        {event.capacity && <Typography variant="h5" component="h5">Capacité d'accueil: {event.capacity}</Typography>}
                        {event.typeEvent && <Typography variant="h5" component="h5">Type de sport: {event.typeEvent}</Typography>}
                        {event.nbEvent && <Typography variant="h5" component="h5">Nombres de matches: {event.nbEvent}</Typography>}
                        <br />

                        {/* <Typography variant="h5" component="h5">
                            Prix: {
                                event.inPromotion
                                    ? <span><span style={{ textDecoration: 'line-through' }}>{event.price}€</span> {event.discountedPrice}€</span>
                                    : event.price === 0
                                        ? "Gratuit"
                                        : `${event.price}€`
                            }
                        </Typography> */}

                        {event.inPromotion && (
                            <Typography gutterBottom variant="h5" component="div" color="green">
                                En promotion -{event.promotionValue}% {event.promotionHasExpiration && " jusqu'à " + moment(event.promotionExpirationDate).format('LLLL') + " (" + moment(event.promotionExpirationDate).fromNow() + ")"}
                            </Typography>
                        )}

                        {event.prices && (
                            <div style={{ display: "flex", flexWrap: "wrap", flexDiretion: 'row', gap: '15px', justifyContent: 'center' }}>
                                {event.prices.map(price => (
                                    <Card key={price.title} style={{ padding: "10px", maxWidth: '250px', textAlign: 'center' }}>
                                        <CardContent>
                                            <Typography component="h3" variant="h3" color="text.primary">
                                                {price.title}
                                            </Typography>
                                            <Typography component="h2" variant="h3" color="text.primary">
                                                {event.inPromotion ? (
                                                    <div>
                                                        <span style={{ textDecoration: 'line-through', fontSize: '2rem' }}>{price.price}€</span> <span style={{ color: 'green' }}>{price.discountedPrice}€</span>
                                                    </div>
                                                ) : (
                                                    price.price === 0 ? "Gratuit" : <spans style={{ color: 'green' }}>{price.price}€</spans>
                                                )}
                                            </Typography>
                                            <Typography component="h3" variant="h5" color="text.secondary">
                                                {price.condition}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}

                        <Typography variant="h5" component="h5">lien du site:<Link href={event.ticketLink}>{event.ticketLink}</Link></Typography>
                    </Grid>

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
                    {/* <Grid item>
                        <Typography variant="h5" component="h5">Note moyenne : {averageRating ? averageRating.toFixed(1) : "Aucune évaluation"}</Typography>
                    </Grid> */}
                    <IconButton component="a" href={shareUrl} target="_blank" rel="noopener">
                        <TwitterIcon />
                    </IconButton>

                </Container>
            </Container >
        </div >
    );
}

export default EventDetail;