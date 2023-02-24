import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Login from './Login';

function Profil() {
    const { userId, isAuthenticated, userFirstname, userLastname, userEmail, userRole, title, companyName, address, phone } = useContext(AuthContext);

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
            {isAuthenticated ? userRole === "creator" ?
                <div>
                    <div>
                        <h1>Voici votre profil de créateur d'événement ! </h1>
                        <h2>Id : {userId}</h2>
                        <h2>Titre : {title}</h2>
                        <h2>Nom de la société : {companyName}</h2>
                        <h2>Adresse de la société : {address}</h2>
                        <h2>Prénom : {userFirstname}</h2>
                        <h2>Nom : {userLastname}</h2>
                        <h2>Email : {userEmail}</h2>
                        <h2>Numéro de téléphone : {phone}</h2>
                        <h2>Nombre de création d'événement restant : {nbMaxEvent}</h2>
                        <h2>Rôle : {userRole}</h2>
                    </div>
                </div>
                :
                <div>
                    <div>
                        <h1>Voici votre profil d'utilisateur ! </h1>
                        <h2>Id : {userId}</h2>
                        <h2>Prénom : {userFirstname}</h2>
                        <h2>Nom : {userLastname}</h2>
                        <h2>Email : {userEmail}</h2>
                        <h2>Rôle : {userRole}</h2>
                        <h2>Est connecté ? : {isAuthenticated ? "oui" : "non"}</h2>
                    </div>
                </div>
                : <div>
                    <p>Veuillez vous connecter pour voir votre profil</p> <Login />
                </div>
            }

        </div>
    );
};

export default Profil;