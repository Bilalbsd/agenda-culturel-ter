import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

function EventsList() {
    const [events, setEvents] = useState([]);
    const [searchDate, setSearchDate] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [searchTheme, setSearchTheme] = useState("");

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/event')
            .then(res => setEvents(res.data))
            .catch(err => console.error(err));
    }, []);

    const filteredEvents = events.filter(event => {
        return moment(event.startDate).format('YYYY-MM-DD').includes(searchDate) && 
        event.location.toLowerCase().includes(searchLocation.toLowerCase()) && 
        event.theme.toLowerCase().includes(searchTheme.toLowerCase())
    });


        // console.log(process.env.REACT_APP_API_URL, "server_api_url");
    return (
        <div>
            <h2>Liste des Événements</h2>
            <div>
                <label>Date:</label>
                <input type="text" value={searchDate} onChange={e => setSearchDate(e.target.value)}/>
            </div>
            <div>
                <label>Location:</label>
                <input type="text" value={searchLocation} onChange={e => setSearchLocation(e.target.value)}/>
            </div>
            <div>
                <label>Theme:</label>
                <input type="text" value={searchTheme} onChange={e => setSearchTheme(e.target.value)}/>
            </div>
            <ul>
                {filteredEvents.map(event => (
                    <li key={event._id}>
                        <h3>Titre: {event.title}</h3>
                        <h3>Pays: {event.country}</h3>
                        <h3>Ville: {event.city}</h3>
                        <h3>Theme: {event.theme}</h3>
                        <h3>Date début - Date fin: {moment(event.startDate).format('DD-MM-YYYY')} - {moment(event.endDate).format('DD-MM-YYYY')}</h3>
                        <h3>Adresse: {event.location}</h3>
                        <h3>Image: {<img src={event.image} alt="img de l'évènement" style={{ width: "150px", height: "150px" }} />}</h3>
                        <h3>Intervenants: {event.speakers}</h3>
                        <h3>Prix: {event.price === 0 ? "Gratuit" : event.price+"€"}</h3>
                        <h3>lien du site: {event.ticketLink}</h3>
                        <h3>Description: {event.description}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventsList;