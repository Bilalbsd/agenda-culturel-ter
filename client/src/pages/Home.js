import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Information from '../components/CreateEvent/Information';
import EventsList from '../components/EventsList';
import NavBar from '../components/NavBar';

import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { userId, isAuthenticated, userFirstname, userLastname, userEmail, userRole } = useContext(AuthContext);

    const [nbMaxEvent, setNbMaxEvent] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/user/${userId}`);
                setNbMaxEvent(res.data.nbMaxEvent); // mettre à jour la valeur de nbMaxEvent
            } catch (err) {
                console.log(err);
            }
        };
        fetchUser();
    }, [userId]); // déclencher l'effet à chaque changement de userId

    return (
        <div>
            {/* <h1>Bienvenue sur l'Agenda Culturel ! Id : {userId} </h1>
            <h2>Prénom : {userFirstname}</h2>
            <h2>Nom : {userLastname}</h2>
            <h2>Email : {userEmail}</h2>
            <h2>Rôle : {userRole}</h2>
            <h2>Nombre maximum d'event à créer: {nbMaxEvent}</h2>
            <h2>Est connecté ? : {isAuthenticated ? "oui" : "non"}</h2>

            <Information /> */}
            <NavBar />
            <EventsList />
        </div>
    );
};

export default Home;