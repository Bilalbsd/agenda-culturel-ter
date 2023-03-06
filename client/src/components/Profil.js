import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Login from './Login';
import { Typography, TextField, Avatar, Box, Grid, Container, Button, Modal } from '@mui/material';

function Profil() {
    const { userId, isAuthenticated, userRole, userFirstname } = useContext(AuthContext);

    const [nbMaxEvent, setNbMaxEvent] = useState(null);
    const [user, setUser] = useState({});


    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/user/${userId}`)
            .then(res => { setUser(res.data); setNbMaxEvent(res.data.nbMaxEvent); console.log(user, "user") })
            .catch(err => console.error(err));
    }, [userId, nbMaxEvent]);

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/user/${userId}`, user)
            .then(res => { console.log(res) })
            .catch(err => console.error(err));
    };

    return (
        <>
            <Container maxWidth="sm">
                {isAuthenticated ? (
                    userRole === 'creator' ? (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <Avatar alt={user.firstname} src="/static/images/avatar/1.jpg" sx={{ width: 100, height: 100 }} variant="rounded" />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Prénom" name="firstname" value={"" + user.firstname} fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Nom" name="lastname" value={"" + user.lastname} fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Email" name="email" value={"" + user.email} fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Numéro de téléphone" name="phone" value={"" + user.phone} fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Titre" name="title" value={"" + user.title} fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Nom de la société" name="companyName" value={"" + user.companyName} fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Adresse de la société" name="address" value={"" + user.address} fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField disabled label="Abonnement" name="subscription" value={"" + user.subscription} fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField disabled label="Jetons de création" value={"" + nbMaxEvent} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField disabled label="Rôle" value={userRole} fullWidth />
                            </Grid>
                            <Grid item xs={12} >
                                <Button value="Envoyer" onClick={handleSubmit}>Mettre à jour</Button>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <Avatar alt={userFirstname} src="/static/images/avatar/1.jpg" sx={{ width: 100, height: 100 }} variant="rounded" />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Prénom" value={"" + user.firstname} fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Nom" value={"" + user.lastname} fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Email" value={"" + user.email} fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField disabled label="Rôle" value={"" + userRole} fullWidth onChange={handleChange} />
                            </Grid>
                        </Grid>
                    )
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Veuillez vous connecter pour voir   <Login /> </Typography>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </>
    )
};

export default Profil;