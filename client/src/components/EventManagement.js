import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import moment from 'moment';

function EventManagement() {
    const [events, setEvents] = useState([]);
    const { userId, userFirstname } = useContext(AuthContext);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/event')
            .then(res => setEvents(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleDelete = id => {
        axios
            .delete(`http://localhost:5000/api/event/${id}`)
            .then(res => {
                setEvents(events.filter(event => event._id !== id));
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Gestionnaire d'événement</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Titre</th>
                        <th>Pays</th>
                        <th>Ville</th>
                        <th>Thème</th>
                        <th>Date de début</th>
                        <th>Date de fin</th>
                        <th>Adresse</th>
                        <th>Créateur</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event._id}>
                            <td>{event._id}</td>
                            <td>{event.title}</td>
                            <td>{event.country}</td>
                            <td>{event.city}</td>
                            <td>{event.theme}</td>
                            <td>{moment(event.startDate).format('DD-MM-YYYY')}</td>
                            <td>{moment(event.startDate).format('DD-MM-YYYY')}</td>
                            <td>{event.location}</td>
                            {/* <td>{event.creator}</td> */}
                            <td>{event.creator === userId ? userFirstname : "compte supprimé"}</td>
                            <td>
                                <button onClick={() => handleDelete(event._id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EventManagement;