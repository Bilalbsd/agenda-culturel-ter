import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import moment from 'moment';
import { Button, FormControl, Grid, Input, InputAdornment, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
// import 'moment/locale/fr'
// moment.locale('fr')

function EditEvent() {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const { userId } = useContext(AuthContext);
    const [location, setLocation] = useState("");
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [predictions, setPredictions] = useState(null);
    const [coords, setCoords] = useState(null);
    const [initialCoords, setInitialCoords] = useState(null);

    useEffect(() => {
        setEvent(prevState => {
            return {
                ...prevState,
                country: prevState.country || '',
                city: prevState.city || '',
                theme: prevState.theme || '',
                startDate: prevState.startDate || '',
                endDate: prevState.endDate || '',
                location: location || '',
                creator: userId || '',
                image: '',
                speakers: prevState.speakers || [],
                price: prevState.price || 0,
                ticketLink: prevState.ticketLink || '',
                description: prevState.description || '',
                lat: prevState.lat || '',
                lng: prevState.lng || '',
            }
        });
    }, [userId, location]);


    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/event/${id}`)
            .then(res => {
                setEvent(res.data);
                console.log(event, "event")
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleChange = e => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    const handleSpeakersChange = (e, index) => {
        let speakers = e.target.value.split(',')
        setEvent({ ...event, [e.target.name]: speakers });
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/event/${id}`, event)
            .then(res => {
                console.log(res);
                setInitialCoords([event.lat, event.lng])
            })
            .catch(err => console.error(err));
    };

    const handleDelete = e => {
        e.preventDefault();
        axios
            .delete(`http://localhost:5000/api/event/${id}`)
            .then(res => {
                setEvent(event.filter(elem => elem._id !== id));
                console.log(res)
            })
            .catch(err => console.error(err));
    };

    const CLE_API = "AIzaSyBvGBV9DUig0t9hvtFy4YcTrouE8S22lQM";


    useEffect(() => {
        if (event.lat && event.lng) {
            setInitialCoords([event.lat, event.lng]);
        }
    }, [event.lat, event.lng]);
    
    console.log(initialCoords, "initialCoords")
    
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${CLE_API}&libraries=places`;
        script.onload = () => {
            const map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: initialCoords[0], lng: initialCoords[1] },
                zoom: 15,
            });
            setMap(map);
        };
        document.body.appendChild(script);
    }, [initialCoords]);

    const handleInputChange = (event) => {
        setLocation(event.target.value);
        const service = new window.google.maps.places.AutocompleteService();
        service.getPlacePredictions({ input: event.target.value }, (results) => {
            setPredictions(results);
        });
    };

    const handlePlaceSelect = (prediction) => {
        const placeService = new window.google.maps.places.PlacesService(map);
        placeService.getDetails({ placeId: prediction.place_id }, (placeResult) => {
            const lat = placeResult.geometry.location.lat();
            const lng = placeResult.geometry.location.lng();
            const marker = new window.google.maps.Marker({
                position: { lat: lat, lng: lng },
                map: map,
            });
            setMarker(marker);
            setCoords({ lat, lng });
            map.setCenter({ lat, lng });
            map.setZoom(15);
            setLocation(prediction.description);
            setPredictions(null);
            setEvent({
                ...event,
                country: placeResult.address_components.find(component => component.types.includes('country')).long_name,
                city: placeResult.address_components.find(component => component.types.includes('locality')).long_name,
                location: location,
                lat: coords.lat,
                lng: coords.lng
            });
        });
    };

    // console.log(event.creator === userId, "true si Id du créateur de l'event a le même Id de l'user connecté")

    return (
        <Grid container justifyContent="center">
            {event.creator !== userId ? (
                <Grid item xs={12}>
                    <Typography variant="h5">Vous n'avez pas les permissions nécessaires pour accéder à cette page !</Typography>
                </Grid>
            ) : (
                <Grid item xs={6} md={4}>
                    <Grid display="flex"
                        width="100hv" height={80}
                        // bgcolor="lightgreen"
                        alignItems="center"
                        justifyContent="center">
                        <Typography variant="h4">Modifier un événement</Typography>
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
                                            name="nbEvent"
                                            label="Nombre de pièces"
                                            fullWidth
                                            type="number"
                                            value={event.nbEvent}
                                            onChange={handleChange}
                                            inputProps={{ min: '1', max: '5', required: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="speaker"
                                            label="Nom du/des comédien(s)"
                                            fullWidth
                                            value={event.speaker}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="speakerPresentation"
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
                                            name="typeEvent"
                                            label="Type de sport"
                                            fullWidth
                                            value={event.typeEvent}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="nbEvent"
                                            label="Nombre de matches"
                                            fullWidth
                                            type="number"
                                            value={event.nbEvent}
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
                                            name="capacity"
                                            label="Capacité d'accueil"
                                            fullWidth
                                            type="number"
                                            value={event.capacity}
                                            onChange={handleChange}
                                            inputProps={{ min: '1', required: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="speaker"
                                            label="Nom du/des artistes(s)"
                                            fullWidth
                                            value={event.speaker}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="speakerPresentation"
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
                                            name="capacity"
                                            label="Capacité d'accueil"
                                            fullWidth
                                            type="number"
                                            value={event.capacity}
                                            onChange={handleChange}
                                            inputProps={{ min: '1', required: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="speaker"
                                            label="Nom du/des danseur(s)"
                                            fullWidth
                                            value={event.speaker}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="speakerPresentation"
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
                                            name="capacity"
                                            label="Capacité d'accueil"
                                            fullWidth
                                            type="number"
                                            value={event.capacity}
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
                                            name="capacity"
                                            label="Capacité d'accueil"
                                            fullWidth
                                            type="number"
                                            value={event.capacity}
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
                                            name="speaker"
                                            label="Nom du/des chanteur(s)"
                                            fullWidth
                                            value={event.speaker}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="speakerPresentation"
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
                                    value={moment(event.startDate).format('YYYY-MM-DDTHH:MM')}
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
                                    value={moment(event.endDate).format('YYYY-MM-DDTHH:MM')}
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
                            <Grid item xs={12} >
                                <TextField fullWidth label="Location" defaultValue={event.location} value={location} onChange={handleInputChange} />
                                {predictions && (
                                    <List>
                                        {predictions.map((prediction) => (
                                            <ListItem
                                                key={prediction.place_id}
                                                button
                                                onClick={() => handlePlaceSelect(prediction)}
                                            >
                                                <ListItemText primary={prediction.description} />
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="country"
                                    label="Pays"
                                    fullWidth
                                    value={'' + event.country}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="city"
                                    label="Ville"
                                    fullWidth
                                    value={'' + event.city}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <div id="map" style={{ height: "400px", width: "100%" }}></div>
                            </Grid>

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

                            <Grid item xs={9} sm={4}>
                                <Button variant="contained" color="primary" type="submit">
                                    Modifier l'événement
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
export default EditEvent;