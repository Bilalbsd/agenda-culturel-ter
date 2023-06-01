import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Login from './Login';
import { Typography, TextField, Avatar, Box, Grid, Container, Button, Modal } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import moment from "moment";

function Profil() {
    const { userId, isAuthenticated, userRole, userFirstname, userSubscription } = useContext(AuthContext);

    const [nbMaxEvent, setNbMaxEvent] = useState(null);
    const [user, setUser] = useState({});
    const [remainingTime, setRemainingTime] = useState(null);
    const [days, setDays] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const [picture, setPicture] = useState(null);
    const [isValidated, setIsValidated] = useState(null);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${userId}`)
            .then(res => {
                setUser(res.data);
                setNbMaxEvent(res.data.nbMaxEvent);
                setSubscription(res.data.subscription);
                setIsValidated(res.data.isValidated);
                // console.log(res.data.subscription, "userSubscription");
                // console.log(user, "user");

                if (res.data.subscriptionExpiration) {
                    const countdownInterval = setInterval(() => {
                        const remainingTime = moment.duration(moment(res.data.subscriptionExpiration).diff(moment()));
                        const days = Math.floor(moment.duration(moment(res.data.subscriptionExpiration).diff(moment())).asDays());
                        setRemainingTime(remainingTime);
                        setDays(days);
                        // const days = Math.floor(remainingTime.asDays());
                        const hours = remainingTime.hours();
                        const minutes = remainingTime.minutes();
                        const seconds = remainingTime.seconds();
                        // console.log(`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds remaining`);
                        if (remainingTime <= 0) {
                            clearInterval(countdownInterval);
                            console.log("Subscription expired");
                        }
                    }, 1000);
                }
            })
            .catch(err => console.error(err));
    }, [userId]);

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handlePhoneChange = phone => {
        if (typeof phone === "string") {
            setUser({ ...user, phone });
        }
    };

    const handlePictureChange = (e) => {
        setPicture(e.target.files[0]);
    };

    const updateProfilPicture = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('picture', picture);
        console.log(formData, "formData");
        try {
            const response = axios.put(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${userId}`, formData);
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${userId}`, user)
            .then(res => { console.log(res) })
            .catch(err => console.error(err));
    };

    console.log(user, 'user');



    return (
        <Container maxWidth="sm">
            {isAuthenticated ? (
                userRole === 'creator' ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                {user.picture != "null" ? <Avatar alt={user.firstname} src={user.picture} sx={{ width: 100, height: 100 }} variant="rounded" /> : <Avatar alt={user.firstname} src="/static/images/avatar/1.jpg" sx={{ width: 100, height: 100 }} variant="rounded" />}
                            </Box>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <input
                                    type="file"
                                    onChange={handlePictureChange}
                                    id="picture-input"
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="picture-input">
                                    <Button variant="outlined" color="primary" component="span">
                                        Modifier la photo
                                    </Button>
                                </label>
                                <Button variant="outlined" color="primary" component="span" onClick={updateProfilPicture}>
                                    Enregistrer
                                </Button>
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
                            <MuiTelInput id="phone" label="Numéro de téléphone" name="phone" value={"" + user.phone} onChange={handlePhoneChange} fullWidth defaultCountry='FR' />
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
                            <TextField disabled label="Créateur validé" name="isValidated" value={"" + user.isValidated} fullWidth onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField disabled label="Abonnement" name="subscription" value={"" + user.subscription} fullWidth onChange={handleChange} />
                        </Grid>
                        {subscription === "mensual" &&
                            <Grid item xs={12}>
                                <TextField disabled label="Expiration de l'abonnement" name="subscriptionExpiration" value={days + " jours"} fullWidth />
                            </Grid>
                        }
                        {subscription === "supmensual" &&
                            <Grid item xs={12}>
                                <TextField disabled label="Expiration" name="subscriptionExpiration" value={days + " jours"} fullWidth />
                            </Grid>
                        }
                        <Grid item xs={12} sm={6}>
                            <TextField disabled label="Jetons de création" value={"" + user.nbMaxEvent} fullWidth />
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
                                {user.picture != "null" ? <Avatar alt={user.firstname} src={user.picture} sx={{ width: 100, height: 100 }} variant="rounded" /> : <Avatar alt={user.firstname} src="/static/images/avatar/1.jpg" sx={{ width: 100, height: 100 }} variant="rounded" />}
                            </Box>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <input
                                    type="file"
                                    onChange={handlePictureChange}
                                    id="picture-input"
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="picture-input">
                                    <Button variant="outlined" color="primary" component="span">
                                        Modifier la photo
                                    </Button>
                                </label>
                                <Button variant="outlined" color="primary" component="span" onClick={updateProfilPicture}>
                                    Enregistrer
                                </Button>
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
                            <MuiTelInput id="phone" label="Numéro de téléphone" name="phone" value={"" + user.phone} onChange={handlePhoneChange} fullWidth defaultCountry='FR' />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField disabled label="Rôle" value={"" + userRole} fullWidth onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} >
                            <Button value="Envoyer" onClick={handleSubmit}>Mettre à jour</Button>
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
    )
};

export default Profil;