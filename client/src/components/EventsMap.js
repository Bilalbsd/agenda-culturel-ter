import { Button, List, ListItem, ListItemText, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

function Localisation() {
    const [location, setLocation] = useState("");
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [predictions, setPredictions] = useState(null);
    const [coords, setCoords] = useState(null);


    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.CLE_API_GOOGLE_MAP}&libraries=places`;
        script.onload = () => {
            const map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: 0, lng: 0 },
                zoom: 2,
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
                position: { lat, lng },
                map: map,
            });
            setMarker(marker);
            setCoords({ lat, lng });
            map.setCenter({ lat, lng });
            map.setZoom(15);
            setLocation(prediction.description);
            setPredictions(null);
        });
    };

    console.log(location, "location")
    console.log(marker, "marker")
    console.log(predictions, "predictions")
    console.log(coords, "coords")

    return (
        <div>
            <TextField label="Location" value={location} onChange={handleInputChange} />
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
            {/* <Button variant="contained" color="primary" onClick={handlePlaceSelect}>
                Select
            </Button> */}
            <div id="map" style={{ height: "400px", width: "50%" }}></div>
        </div>
    );
}

export default Localisation;