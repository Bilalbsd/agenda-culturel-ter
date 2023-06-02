import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button, FormControl, Grid, Input, InputAdornment, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material';

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

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/event/${id}`, event)
            .then(res => {
                console.log(res);
                setInitialCoords([event.coords1, event.coords2])
            })
            .catch(err => console.error(err));
    };

    const CLE_API = "AIzaSyBvGBV9DUig0t9hvtFy4YcTrouE8S22lQM";


    useEffect(() => {
        if (event.coords1 && event.coords2) {
            setInitialCoords([event.coords1, event.coords2]);
        }
    }, [event.coords1, event.coords2]);


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
    }, []);

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
                position: { lat: initialCoords[0], lng: initialCoords[1] },
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
                coords1: coords.lat,
                coords2: coords.lng
            });
        });
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={6} md={4}>
                <Grid display="flex">
                    <Typography variant="h4">Modifier un événement</Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <Grid spacing={2} >
                        <Grid item xs={12} >
                            <TextField fullWidth label="Location" defaultValue={location} value={location} onChange={handleInputChange} />
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
                    </Grid>
                    <Grid item xs={12}>
                        <div id="map" style={{ height: "400px", width: "100%" }}></div>
                    </Grid>
                    <Grid item xs={9} sm={4}>
                        <Button variant="contained" color="primary" type="submit">
                            Modifier l'événement
                        </Button>
                    </Grid>
                </form>

            </Grid >
        </Grid >
    );
}
export default EditEvent;