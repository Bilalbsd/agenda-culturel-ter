import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { Box, Grid, Typography, Button, Checkbox } from '@mui/material';
import { Container } from '@mui/system';
import 'moment/locale/fr'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import EventIcon from '@mui/icons-material/Event';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { AuthContext } from '../context/AuthContext';
moment.locale('fr')

function EventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const [agenda, setAgenda] = useState(false);

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const { userId } = useContext(AuthContext);


    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/event/${id}`)
            .then(res => setEvent(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const [agendaEvents, setAgendaEvents] = useState([]);

    // Récupérer les données de l'utilisateur à partir de l'API
    useEffect(() => {
        axios.get(`http://localhost:5000/api/user/${userId}`)
            .then(res => {
                setAgendaEvents(res.data.agendaEvents);
                if (res.data.agendaEvents.includes(id)) {
                    setAgenda(true);
                } else {
                    setAgenda(false);
                }
            })
            .catch(err => console.error(err));
    }, [userId]);


    const handleAgenda = () => {
        if (!agenda) {
            axios
                .put(`http://localhost:5000/api/user/${userId}`, {
                    agendaEvents: [...agendaEvents, id]
                })
                .then(res => {
                    setAgenda(true);
                    console.log(res);
                })
                .catch(err => console.error(err));
        }
        if (agenda) {
            const updatedagendas = agendaEvents.filter(fav => fav !== id);
            axios
                .put(`http://localhost:5000/api/user/${userId}`, {
                    agendaEvents: updatedagendas
                })
                .then(res => {
                    setAgenda(false);
                    console.log(res);
                })
                .catch(err => console.error(err));
        }
    };



    return (
        <div>
            <Container maxWidth="lg" >
                <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Checkbox
                            {...label}
                            icon={!agenda ? <EventIcon /> : <EventAvailableIcon />}
                            // checkedIcon={agenda && <agenda />}
                            onClick={handleAgenda}
                        />
                        <Button
                            variant="contained"
                            color={!agenda ? "primary" : "error"}
                            // disabled={agenda}
                            onClick={handleAgenda}
                        >
                            {agenda ? 'Retirer de l\'agenda' : 'Ajouter à l\'agenda'}
                        </Button>
                    </Box>
                </Container>
            </Container>
        </div >
    );
}

export default EventDetail;