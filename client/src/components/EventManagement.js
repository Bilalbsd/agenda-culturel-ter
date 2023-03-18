import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import moment from 'moment';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Avatar, Pagination } from '@mui/material';
import { Container } from '@mui/system';

function EventManagement() {
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const { userId, userFirstname } = useContext(AuthContext);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/event`)
            .then(res => setEvents(res.data))
            .catch(err => console.error(err));

        axios
            .get(`http://localhost:5000/api/user`)
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));


    }, []);

    console.log(events.map(event => event.creator), "events");

    const handleDelete = id => {
        axios
            .delete(`http://localhost:5000/api/event/${id}`)
            .then(res => {
                setEvents(events.filter(event => event._id !== id));
            })
            .catch(err => console.error(err));
    };

    return (

        <Container maxWidth="xl">
            <TableContainer component={Paper} style={{ height: '650px', overflowY: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Titre</TableCell>
                            <TableCell>Pays</TableCell>
                            <TableCell>Ville</TableCell>
                            <TableCell>Thème</TableCell>
                            <TableCell>Date de début</TableCell>
                            <TableCell>Date de fin</TableCell>
                            <TableCell>Adresse</TableCell>
                            <TableCell>Créateur</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((event) => (
                            <TableRow key={event._id}>
                                <TableCell>{event._id}</TableCell>
                                <TableCell>{event.title}</TableCell>
                                <TableCell>{event.country}</TableCell>
                                <TableCell>{event.city}</TableCell>
                                <TableCell>{event.theme}</TableCell>
                                <TableCell>{moment(event.startDate).format('DD-MM-YYYY')}</TableCell>
                                <TableCell>{moment(event.endDate).format('DD-MM-YYYY')}</TableCell>
                                <TableCell>{event.location}</TableCell>
                                <TableCell>
                                    {users.map((user) =>
                                        event.creator === user._id ? (
                                            <span key={user._id}>
                                                <Avatar alt={user.firstname} src="/static/images/avatar/1.jpg" />
                                                {user.firstname} {user.lastname}
                                            </span>
                                        ) : null
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(event._id)}>
                                        Supprimer
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )

}

export default EventManagement;