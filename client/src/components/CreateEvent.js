import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Alert, Button, FormControl, Grid, Input, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CheckIcon from '@mui/icons-material/Check';
import { DropzoneArea } from "mui-file-dropzone";

function CreateEvent() {
    const { userId, userRole, nbMaxEvent, setNbMaxEvent } = useContext(AuthContext);
    const [event, setEvent] = useState({});

    // On utilise un useEffect pour initialiser 'creator: userId' car sinon on a 'creator: null'
    useEffect(() => {
        setEvent({
            title: '',
            country: '',
            city: '',
            theme: '',
            startDate: '',
            endDate: '',
            location: '',
            creator: userId,
            image: '',
            speakers: [],
            price: 0,
            ticketLink: '',
            description: ''
        });
        // On modifie creator à chaque update de userId
    }, [userId])

    // console.log(userId, "creatorBefore")

    const [image, setImage] = useState(null);
    const [changeEvent, setChangeEvent] = useState(null);

    const handleChange = e => {
        setEvent({ ...event, [e.target.name]: e.target.value });
        setImage(e.target.files[0]);
        setChangeEvent(e.target.value)
    };

    const [speakersCount, setSpeakersCount] = useState(1);

    const handleSpeakersCountChange = (e) => {
        setSpeakersCount(e.target.value);
    }

    const handleSpeakersChange = (e, index) => {
        const newSpeakers = [...event.speakers];
        newSpeakers[index] = e.target.value;
        setEvent({ ...event, speakers: newSpeakers });
    }

    useEffect(() => {
        try {
            const res = axios.get(`http://localhost:5000/api/user/${userId}`);
            setNbMaxEvent(res.data.nbMaxEvent); // mettre à jour la valeur de nbMaxEvent
        } catch (err) {
            console.log(err);
        }
    }, [userId, nbMaxEvent]); // déclencher l'effet à chaque changement de userId

    const updateNbMaxEvent = async () => {
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            This is a success alert — check it out!
        </Alert>
        try {
            const res = await axios.put(`http://localhost:5000/api/user/${userId}`, {
                nbMaxEvent: nbMaxEvent - 1 // utiliser la valeur actuelle de nbMaxEvent obtenue de l'API
            });
            console.log(res, "res");
            setNbMaxEvent(nbMaxEvent - 1);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        // updateNbMaxEvent();
        const formData = new FormData();
        formData.append('image', image);
        // On ajoute les éléments de event dans formData
        Object.keys(event).forEach(key => formData.append(key, event[key]));
        // console.log(image, "image")
        // console.log(formData, "formData")
        try {
            const res = await axios.post(`http://localhost:5000/api/event`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res);
        } catch (err) {
            console.log(err);
        }

    };

    return (
        <Grid container justifyContent="center">
            {userRole !== 'creator' ? (
                <Grid item xs={12}>
                    <Typography variant="h5">Vous n'avez pas les permissions nécessaires pour accéder à cette page !</Typography>
                </Grid>
            ) : nbMaxEvent === 0 ? (
                <Grid item xs={12}>
                    <Typography variant="h5">Vous avez atteint la limite de création d'événement ! Veuillez souscrire à un abonnement.</Typography>
                </Grid>
            ) : (
                <Grid item xs={6} md={4}>
                    <Grid display="flex"
                        width="100hv" height={80}
                        // bgcolor="lightgreen"
                        alignItems="center"
                        justifyContent="center">
                        <Typography variant="h4">Créer un événement</Typography>
                    </Grid>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="title"
                                    label="Titre"
                                    fullWidth
                                    value={event.title}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="country"
                                    label="Pays"
                                    fullWidth
                                    value={event.country}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="city"
                                    label="Ville"
                                    fullWidth
                                    value={event.city}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth required>
                                    <InputLabel htmlFor="event-theme-select">Événement</InputLabel>
                                    <Select
                                        native
                                        value={event.theme}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'theme',
                                            id: 'event-theme-select',
                                        }}
                                    >
                                        <option aria-label="Choisir un événement" value="" disabled />
                                        <option value="Théâtre">Théâtre</option>
                                        <option value="Sport">Sport</option>
                                        <option value="Concert">Concert</option>
                                        <option value="Festival">Festival</option>
                                        <option value="Danse">Danse</option>
                                        <option value="Spectacle">Spectacle</option>
                                        <option value="Exposition">Exposition</option>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {event.theme === 'Théâtre' && (
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="nbPieces"
                                            label="Nombre de pièces"
                                            fullWidth
                                            type="number"
                                            value={event.nbPieces}
                                            onChange={handleChange}
                                            inputProps={{ min: '1', max: '5', required: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="actor"
                                            label="Nom du/des comédien(s)"
                                            fullWidth
                                            value={event.speaker}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="actorPresentation"
                                            label="Présentation du/des comédien(s)"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={event.speakerPresentation}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </>

                            )}
                            {event.theme === 'Sport' && (
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="singer"
                                            label="Type de sport"
                                            fullWidth
                                            value={event.typeSport}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="nbMatch"
                                            label="Nombre de matches"
                                            fullWidth
                                            type="number"
                                            value={event.nbMatch}
                                            onChange={handleChange}
                                            inputProps={{ min: '1', max: '5', required: true }}
                                        />
                                    </Grid>
                                </>
                            )}
                            {event.theme === 'Festival' && (
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="nbPeople"
                                            label="Capacité d'accueil"
                                            fullWidth
                                            type="number"
                                            value={event.nbPeople}
                                            onChange={handleChange}
                                            inputProps={{ min: '1', required: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="artist"
                                            label="Nom du/des artistes(s)"
                                            fullWidth
                                            value={event.speaker}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="artistPresentation"
                                            label="Présentation du/des artistes(s)"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={event.speakerPresentation}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </>
                            )}
                            {event.theme === 'Danse' && (
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="nbPeople"
                                            label="Capacité d'accueil"
                                            fullWidth
                                            type="number"
                                            value={event.nbPeople}
                                            onChange={handleChange}
                                            inputProps={{ min: '1', required: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="danser"
                                            label="Nom du/des danseur(s)"
                                            fullWidth
                                            value={event.speaker}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="danserPresentation"
                                            label="Présentation du/des danseur(s)"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={event.speakerPresentation}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </>
                            )}
                            {event.theme === 'Spectacle' && (
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="nbPeople"
                                            label="Capacité d'accueil"
                                            fullWidth
                                            type="number"
                                            value={event.nbPeople}
                                            onChange={handleChange}
                                            inputProps={{ min: '1', required: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="speaker"
                                            label="Nom du/des intervenant(s)"
                                            fullWidth
                                            value={event.speaker}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="speakerPresentation"
                                            label="Présentation du/des intervenant(s)"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={event.speakerPresentation}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </>
                            )}
                            {event.theme === 'Exposition' && (
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="nbPeople"
                                            label="Capacité d'accueil"
                                            fullWidth
                                            type="number"
                                            value={event.nbPeople}
                                            onChange={handleChange}
                                            inputProps={{ min: '1', required: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="speaker"
                                            label="Nom du/des conférencier(s)"
                                            fullWidth
                                            value={event.speaker}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="speakerPresentation"
                                            label="Présentation du/des conférencier(s)"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={event.speakerPresentation}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </>
                            )}
                            {event.theme === 'Concert' && (
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="singer"
                                            label="Nom du/des chanteur(s)"
                                            fullWidth
                                            value={event.speaker}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="singerPresentation"
                                            label="Présentation du/des chanteur(s)"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={event.speakerPresentation}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </>
                            )}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="startDate"
                                    label="Date de début"
                                    fullWidth
                                    type="datetime-local"
                                    value={event.startDate}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="endDate"
                                    label="Date de fin"
                                    fullWidth
                                    type="datetime-local"
                                    value={event.endDate}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="image-input"
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                />
                                <label htmlFor="image-input">
                                    <Button variant="contained" component="span" startIcon={<PhotoCameraIcon />}>
                                        Upload
                                    </Button>
                                </label>
                                {/* <DropzoneArea onChange={handleChange} /> */}
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <TextField
                                    id="location-input"
                                    label="Adresse"
                                    type="text"
                                    name="location"
                                    fullWidth
                                    value={event.location}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>


                            {/* <Grid item xs={12} sm={3}>
                                <TextField
                                    id="speakers-count-input"
                                    label="Nombre d'intervenants"
                                    type="number"
                                    fullWidth
                                    value={speakersCount}
                                    onChange={handleSpeakersCountChange}
                                    inputProps={{ min: 0, max: 10 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                {Array.from({ length: speakersCount }, (_, i) => (
                                    <div key={i}>
                                        <TextField
                                            fullWidth
                                            id={`speaker-name-input-${i}`}
                                            label={`Nom de l'intervenant ${i + 1}`}
                                            type="text"
                                            value={event.speakers[i] || ''}
                                            onChange={(e) => handleSpeakersChange(e, i)}
                                        />
                                    </div>
                                ))}
                            </Grid> */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="price-input"
                                    label="Prix"
                                    type="number"
                                    name="price"
                                    fullWidth
                                    value={event.price}
                                    onChange={handleChange}
                                    inputProps={{ min: 0 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="ticket-link-input"
                                    label="Lien du ticket"
                                    type="text"
                                    name="ticketLink"
                                    fullWidth
                                    value={event.ticketLink}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="description-input"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    name="description"
                                    fullWidth
                                    value={event.description}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" type="submit" onClick={updateNbMaxEvent}>
                                    Créer l'événement
                                </Button>
                            </Grid>
                        </Grid>

                    </form>
                </Grid >
            )
            }
        </Grid >
    );
}

export default CreateEvent;