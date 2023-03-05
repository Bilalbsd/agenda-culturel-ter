// import React, { useState, useEffect } from 'react';

// const Localisation = () => {
//     const [location, setLocation] = useState({});

//     const CLE_API = "AIzaSyBvGBV9DUig0t9hvtFy4YcTrouE8S22lQM";

//     useEffect(() => {
//         navigator.geolocation.getCurrentPosition(
//             position => {
//                 const latitude = position.coords.latitude;
//                 const longitude = position.coords.longitude;
//                 const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${CLE_API}`;
//                 fetch(geocodeUrl)
//                     .then(response => response.json())
//                     .then(data => {
//                         console.log(data, "data")
//                         const addressComponents = data.results[0].address_components;
//                         const country = addressComponents.find(component => component.types.includes('country')).long_name;
//                         const city = addressComponents.find(component => component.types.includes('locality')).long_name;
//                         setLocation({ country, city });
//                     });
//             },
//             error => {
//                 console.log(error);
//             }
//         );
//     }, []);

//     return (
//         <div>
//             {location.country && location.city && (
//                 <p>Pays : {location.country}, Ville : {location.city}</p>
//             )}
//         </div>
//     );
// };

// export default Localisation;


import React, { useState, useEffect } from 'react';

function Localisation() {
    const [latLng, setLatLng] = useState(null);
    const [events, setEvents] = useState([]);

    const CLE_API = "AIzaSyBvGBV9DUig0t9hvtFy4YcTrouE8S22lQM";

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLatLng({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                error => {
                    console.error(error);
                }
            );
        } else {
            console.error('Votre navigateur ne supporte pas la géolocalisation.');
        }
    }, []);

    useEffect(() => {
        if (latLng) {
            const { lat, lng } = latLng;
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10000&type=event&key=${CLE_API}`;
            fetch(url)
                .then(response => response.json())
                .then(data => setEvents(data.results))
                .catch(error => console.error(error));
        }
    }, [latLng]);

    return (
        <div>
            {latLng && (
                <div>
                    <p>Latitude : {latLng.lat}</p>
                    <p>Longitude : {latLng.lng}</p>
                </div>
            )}
            {events.length > 0 && (
                <div>
                    <h2>Événements à proximité :</h2>
                    <ul>
                        {events.map(event => (
                            <li key={event.place_id}>
                                <h3>{event.name}</h3>
                                <p>{event.vicinity}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Localisation;
