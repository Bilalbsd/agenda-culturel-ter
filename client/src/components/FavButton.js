import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { Box, Grid, Typography, Button, Checkbox } from '@mui/material';
import { Container } from '@mui/system';
import 'moment/locale/fr'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { AuthContext } from '../context/AuthContext';
moment.locale('fr')

function EventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const [favorite, setFavorite] = useState(false);

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const { userId, userRole, nbMaxEvent, setNbMaxEvent } = useContext(AuthContext);


    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_API_URL}/api/event/${id}`)
            .then(res => setEvent(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const [favoriteEvents, setFavoriteEvents] = useState([]);

    // Récupérer les données de l'utilisateur à partir de l'API
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${userId}`)
            .then(res => {
                setFavoriteEvents(res.data.favoriteEvents);
                if (res.data.favoriteEvents.includes(id)) {
                    setFavorite(true);
                } else {
                    setFavorite(false);
                }
            })
            .catch(err => console.error(err));
    }, [userId]);


    const handleFavorite = () => {
        if (!favorite) {
            axios
                .put(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${userId}`, {
                    favoriteEvents: [...favoriteEvents, id]
                })
                .then(res => {
                    setFavorite(true);
                    console.log(res);
                })
                .catch(err => console.error(err));
        }
        if (favorite) {
            const updatedFavorites = favoriteEvents.filter(fav => fav !== id);
            axios
                .put(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${userId}`, {
                    favoriteEvents: updatedFavorites
                })
                .then(res => {
                    setFavorite(false);
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
                            icon={!favorite ? <FavoriteBorder /> : <Favorite />}
                            // checkedIcon={favorite && <Favorite />}
                            onClick={handleFavorite}
                        />
                        <Button
                            variant="contained"
                            color={!favorite ? "primary" : "error"}
                            // disabled={favorite}
                            onClick={handleFavorite}
                        >
                            {favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                        </Button>
                    </Box>
                </Container>
            </Container>
        </div >
    );
}

export default EventDetail;