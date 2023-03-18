import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

const Notification = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/event`)
            .then(res => {
                setEvents(res.data);
            })
    }, [])

    return (
        <div>
            {events.map(event => (
                <div key={event._id}>
                    <h3>{'Cet événement pourrait vous intéresser : '+ event.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default Notification;
