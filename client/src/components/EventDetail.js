import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { Box, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import 'moment/locale/fr'
moment.locale('fr')

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
            <Container maxWidth="lg" >
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
                    
                </Container>
            </Container>
        </div >
    );
}

export default EventDetail;