import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Information from '../components/CreateEvent/Information';
import jwtDecode from 'jwt-decode';

import { AuthContext } from '../context/AuthContext';


const Home = () => {
    const { userId, isAuthenticated, userFirstname, userLastname, userEmail, userRole } = useContext(AuthContext);
    console.log(userId, "user de home")
    console.log(isAuthenticated, "isAuthenticated de home")

    const [nbMaxEvent, setNbMaxEvent] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        setNbMaxEvent(decoded.nbMaxEvent)
    }, [])
    console.log(nbMaxEvent, "nbMaxEvent");

    const updateNbMaxEvent = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/api/user/${userId}`, {
                nbMaxEvent: 10
            });
            console.log(res, "res");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Bienvenue sur l'Agenda Culturel ! Id : {userId} </h1>
            <h2>Prénom : {userFirstname}</h2>
            <h2>Nom : {userLastname}</h2>
            <h2>Email : {userEmail}</h2>
            <h2>Rôle : {userRole}</h2>
            <h2>Nombre maximum d'event à créer: {nbMaxEvent}</h2>
            <h2>Est connecté ? : {isAuthenticated ? "oui" : "non"}</h2>

            <button type="submit" onClick={updateNbMaxEvent}>Envoyer</button>

            <Information />
        </div>
    );
};

export default Home;