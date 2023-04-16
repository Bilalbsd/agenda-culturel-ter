import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

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

    return (
        <div>
            <button onClick={handleEventNotificationsToggle}>{eventNotifications ? 'Désactiver' : 'Activer'} les notifications d'événement</button>
            <button onClick={handlePromotionNotificationsToggle}>{promotionNotifications ? 'Désactiver' : 'Activer'} les notifications de promotion</button>
            <p>Nombre de notifications: {notifications.length}</p>
            {eventNotifications && events.map(event => {
                if (notifications.some(notification => notification === event.title)) {
                    return (
                        <div key={event.id}>
                            <p>{`Nouvel événement ajouté! titre: ${event.title} ID: ${event._id}`}</p>
                            <button onClick={() => handleDeleteNotification(event.title)}>Supprimer la notification</button>
                        </div>
                    );
                } else {
                    return null;
                }
            })}
            {promotionNotifications && events.map(event => {
                if (notifications.some(notification => event._id === notification)) {
                    return (
                        <div key={event.id}>
                            <p>{`Nouvelle promotion ajouté! titre: ${event.title}, promotion: ${event.promotionValue}% ID: ${event._id}`}</p>
                            <button onClick={() => handleDeleteNotification(event._id)}>Supprimer la notification</button>
                        </div>
                    );
                } else {
                    return null;
                }
            })}
        </div>
    )
}

export default Notifications;
