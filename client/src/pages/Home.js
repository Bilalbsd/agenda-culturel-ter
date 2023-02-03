import React, { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';


const Home = () => {
    const { userId, isAuthenticated, userFirstname, userLastname, userEmail, userRole } = useContext(AuthContext);
    console.log(userId, "user de home")
    console.log(isAuthenticated, "isAuthenticated de home")
    return (
        <div>
            <h1>Bienvenue sur l'Agenda Culturel ! Id : {userId} </h1>
            <h2>Prénom : {userFirstname}</h2>
            <h2>Nom : {userLastname}</h2>
            <h2>Email : {userEmail}</h2>
            <h2>Rôle : {userRole}</h2>
            <h2>Est connecté ? : {isAuthenticated ? "oui" : "non"}</h2>
        </div>
    );
};

export default Home;