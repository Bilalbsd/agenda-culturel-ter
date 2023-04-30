import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button, Card, CardContent, Container, Divider, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DiscountIcon from '@mui/icons-material/Discount';
import { NavLink } from 'react-router-dom';

const Notifications = () => {
    const { userId } = useContext(AuthContext);

    const [user, setUser] = useState([]);
    const [events, setEvents] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [eventNotifications, setEventNotifications] = useState(null);
    const [promotionNotifications, setPromotionNotifications] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/user/${userId}`)
            .then(res => {
                setUser(res.data);
                setNotifications(res.data.notifications);
                setEventNotifications(res.data.eventNotifications);
                setPromotionNotifications(res.data.promotionNotifications);
            });

        axios.get(`http://localhost:5000/api/event`)
            .then(res => setEvents(res.data));
    }, [userId]);


    const handleDeleteNotification = (notificationId) => {
        const updatedNotifications = notifications.filter(notification => notification !== notificationId);
        setNotifications(updatedNotifications);
        axios.put(`http://localhost:5000/api/user/${userId}`, {
            notifications: updatedNotifications
        });
    };

    const handleDeleteAllNotification = () => {
        axios.put(`http://localhost:5000/api/user/${userId}`, {
            notifications: []
        });
    }

    const handleEventNotificationsToggle = () => {
        const newEventNotifications = !eventNotifications;
        setEventNotifications(newEventNotifications);
        axios.put(`http://localhost:5000/api/user/${userId}`, {
            eventNotifications: newEventNotifications
        });
    }

    const handlePromotionNotificationsToggle = () => {
        const newPromotionNotifications = !promotionNotifications;
        setPromotionNotifications(newPromotionNotifications);
        axios.put(`http://localhost:5000/api/user/${userId}`, {
            promotionNotifications: newPromotionNotifications
        });
    }

    const reversedNotifications = [...notifications].reverse();

    return (
        <Grid container spacing={2} maxWidth="xl" sx={{ textAlign: 'center' }} style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', margin: '0 auto', alignItems: 'center' }}>
            <Grid item xs={12}>
                <Button onClick={handleEventNotificationsToggle} variant="contained" color="primary">
                    {eventNotifications ? 'Désactiver' : 'Activer'} les notifications d'événement
                </Button>
                <Button onClick={handlePromotionNotificationsToggle} variant="contained" color="primary">
                    {promotionNotifications ? 'Désactiver' : 'Activer'} les notifications de promotion
                </Button>
                <Button onClick={handleDeleteAllNotification} variant="contained" color="primary">
                    Supprimer toutes les notifications
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">Nombre de notifications: {notifications.length}</Typography>
            </Grid>
            <div style={{ display: "flex", flexWrap: "wrap", alignContent: "center", justifyContent: "center", flexDirection: "column", minWidth: "1500px", gap: "30px" }}>
                {eventNotifications &&
                    events.map((event) => {
                        if (reversedNotifications.some((notification) => notification === event.title)) {
                            return (
                                <Grid item xs={12} sm={6} md={4} key={event.id}>
                                    <Card>
                                        <CardContent>
                                            <img src={event.image} alt="img de l'évènement" style={{ width: "30%", height: "30%" }} />
                                            <Typography variant="h5" component="h5">{`Nouvel événement ajouté !`}</Typography>
                                            <Typography variant="h5" component="h5" color="blue">{`${event.title}`}</Typography>
                                            <br />
                                            <NavLink
                                                to={`/events/${event._id}`}
                                                style={{ textDecoration: 'none', color: 'grey' }}
                                            >
                                                <Button variant="contained" color="primary">Voir l'événement</Button>
                                            </NavLink>
                                            <Button onClick={() => handleDeleteNotification(event.title)} variant="contained" color="error">
                                                Supprimer
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        } else {
                            return null;
                        }
                    })}
                {promotionNotifications &&
                    events.map((event) => {
                        if (reversedNotifications.some((notification) => event._id === notification)) {
                            return (
                                <Grid item xs={12} sm={6} md={4} key={event.id}>
                                    <Card>
                                        <CardContent>
                                            <DiscountIcon />
                                            <Typography variant="h5" component="h5">Nouvelle promotion de {<span style={{ color: "green" }}>{event.promotionValue}%</span>}</Typography>
                                            <Typography variant="h5" component="h5" color="blue">{`${event.title}`}</Typography>
                                            <br />
                                            <NavLink
                                                to={`/events/${event._id}`}
                                                style={{ textDecoration: 'none', color: 'grey' }}
                                            >
                                                <Button variant="contained" color="primary">Voir la promotion</Button>
                                            </NavLink>
                                            <Button onClick={() => handleDeleteNotification(event._id)} variant="contained" color="error">
                                                Supprimer
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        } else {
                            return null;
                        }
                    })}
                {events.map((event) => {
                    if (reversedNotifications.some((notification) => notification === "share" + event._id)) {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={event.id}>
                                <Card>
                                    <CardContent>
                                        <img src={event.image} alt="img de l'évènement" style={{ width: "30%", height: "30%" }} />
                                        <Typography variant="h5" component="h5">{`Nouvel événement vous a été partagé !`}</Typography>
                                        <Typography variant="h5" component="h5" color="red">{`${event.title}`}</Typography>
                                        <br />
                                        <NavLink
                                            to={`/events/${event._id}`}
                                            style={{ textDecoration: 'none', color: 'grey' }}
                                        >
                                            <Button variant="contained" color="primary">Voir l'événement</Button>
                                        </NavLink>
                                        <Button onClick={() => handleDeleteNotification(event.title)} variant="contained" color="error">
                                            Supprimer
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        </Grid>
    );
}

export default Notifications;
