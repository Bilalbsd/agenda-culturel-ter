import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';

function EventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/event/${id}`)
            .then(res => setEvent(res.data))
            .catch(err => console.error(err));
    }, [id]);

    return (
        <div>
            <h3>Titre: {event.title}</h3>
            <h3>Pays: {event.country}</h3>
            <h3>Ville: {event.city}</h3>
            <h3>Theme: {event.theme}</h3>
            <h3>Date début - Date fin: {moment(event.startDate).format('DD-MM-YYYY')} - {moment(event.endDate).format('DD-MM-YYYY')}</h3>
            <h3>Adresse: {event.location}</h3>
            <h3>Image: {<img src={event.image} alt="img de l'évènement" style={{ width: "150px", height: "150px" }} />}</h3>
            <h3>Intervenants: {event.speakers}</h3>
            <h3>Prix: {event.price === 0 ? "Gratuit" : 0 + "€"}</h3>
            <h3>lien du site: {event.ticketLink}</h3>
            <h3>Description: {event.description}</h3>
        </div>
    );
}

export default EventDetail;
