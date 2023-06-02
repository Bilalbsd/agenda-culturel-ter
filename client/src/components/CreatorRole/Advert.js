import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const Advert = () => {
    const [file, setFile] = useState(null);
    const [duration, setDuration] = useState(1);
    const { id } = useParams();
    const { userId, userRole } = useContext(AuthContext);

    const [user, setUser] = useState({});
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${userId}`)
            .then(res => { setUser(res.data); console.log(user, "user") })
            .catch(err => console.error(err));
    }, [userId]);

    const durationInHours = parseInt(duration);
    const durationInMillis = durationInHours * 60 * 60 * 1000;
    const expiryDate = new Date(Date.now() + durationInMillis);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('advert[active]', true);
        formData.append('advert[file]', file.name);
        formData.append('advert[duration]', expiryDate.toISOString());

        try {
            const response = await axios.put(`${process.env.REACT_APP_SERVER_API_URL}/api/event/${id}`, formData);
            console.log(response.data);
            window.location.href = "/";
        } catch (err) {
            console.error(err);
        }
    };


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDurationChange = (e) => {
        setDuration(e.target.value);
    }

    console.log(id, "id mediaform");

    const typeOfSubscription = (sub) => {
        switch (sub) {
            case 'free':
                return 'Gratuit';
            case 'mensual':
                return 'Mensuel';
            case 'supmensual':
                return 'Mensuel Supérieur';
            case 'punctual':
                return 'Ponctuel';
            case 'suppunctual':
                return 'Poncutle Supérieur';
        }
    }

    return (
        <div>
            {user.subscription === "suppunctual" || user.subscription === "supmensual" ? (
                <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                    <br /> <br /> <br />
                    <Typography variant="h3" component="h3" sx={{ marginBottom: 4 }}>
                        Ajouter une publicité
                    </Typography>
                    <Typography variant="h5" component="h5" sx={{ marginBottom: 4 }}>
                        Vous avez l'abonnement {typeOfSubscription(user.subscription)} !
                    </Typography>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        {/* <Grid item xs={12} md={6}>
                            <label htmlFor="file" sx={{ display: 'block', marginBottom: 1 }}>
                                <CloudUploadIcon sx={{ marginRight: 1 }} />
                                File:
                            </label>
                            <input type="file" id="file" name="file" onChange={handleFileChange} />
                        </Grid> */}
                        <Grid item xs={12}>
                            <input
                                style={{ display: 'none' }}
                                id="image-input"
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="image-input">
                                <Button variant="contained" component="span" startIcon={<PhotoCameraIcon />}>
                                    Upload
                                </Button>
                            </label>
                            {/* <DropzoneArea onChange={handleChange} /> */}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputLabel id="duration-label">Durée</InputLabel>
                            <Select
                                labelId="duration-label"
                                id="duration"
                                name="duration"
                                defaultValue={1}
                                value={duration}
                                label="Durée"
                                onChange={handleDurationChange}
                            >
                                <MenuItem value={1}>1 heure</MenuItem>
                                <MenuItem value={3}>3 heures</MenuItem>
                                <MenuItem value={12}>12 heures</MenuItem>
                                <MenuItem value={24}>24 heures</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Button variant="contained" onClick={handleSubmit} sx={{ marginTop: 4 }}>
                        Ajouter
                    </Button>
                </Container>
            ) : (
                <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" component="h5" sx={{ marginBottom: 4 }}>
                        Vous n'avez pas l'abonnement requis pour ajouter une publicité
                    </Typography>
                    <Typography variant="h5" component="h5">
                        Vous avez l'abonnement {user.subscription} !
                    </Typography>
                </Container>
            )}
        </div>
    );
};

export default Advert;