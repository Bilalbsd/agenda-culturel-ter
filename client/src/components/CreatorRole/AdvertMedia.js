import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { Button, Typography } from '@mui/material';

const AdvertMedia = () => {
    const boxStyle = {
        backgroundColor: 'salmon',
        boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
        padding: '20px',
    };

    const [events, setEvents] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_API_URL}/api/event`)
        .then((res) => {
            setEvents(res.data.filter((e) => e.advert));
        });
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Calculate the remaining time for each event
            const updatedEvents = events.map((event) => {
                const remainingTime = moment.duration(moment(event.advert.duration).diff(moment()));
                return { ...event, remainingTime };
            });

            // Filter out the events whose time has expired
            const filteredEvents = updatedEvents.filter(
                (event) => event.remainingTime.asSeconds() > 0
            );

            // Update the events list
            setEvents(filteredEvents);
        }, 1000);

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [events]);

    useEffect(() => {
        if (events) {
            events.forEach((event) => {
                if (moment(event.advert.duration).isBefore(moment())) {
                    axios.put(`http://localhost:5000/api/event/${event._id}`, {
                        advert: null,
                    }).then(() => {
                        setEvents(events.filter((e) => e._id !== event._id));
                    });
                }
            });
        }
    }, [events]);

    return (
        <div style={boxStyle}>
            <Carousel>
                {events &&
                    events.map((event, index) => (
                        <div key={index}>
                            <video src={event.file} width='640' height='360' autoPlay loop controls></video>
                            <br />
                            <NavLink
                                to={`/events/${event._id}`}
                                style={{ textDecoration: 'none', color: 'grey' }}
                            >
                                <Button variant="contained" color="primary">Voir l'événement</Button>
                            </NavLink>
                            {event.remainingTime && event.remainingTime.asSeconds() > 0 ? (
                                <h2>
                                    {"Fin de la pub dans : " + event.remainingTime.humanize()}
                                    <br />
                                    {event.remainingTime.hours()}:{event.remainingTime.minutes()}:{event.remainingTime.seconds()}
                                </h2>
                            ) : null}
                            <br />
                        </div>
                    ))
                }
            </Carousel>
        </div>
    );
};

export default AdvertMedia;
