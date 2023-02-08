import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Login from './Login';

function Profil() {
    const { userId, isAuthenticated, userFirstname, userLastname, userEmail, userRole } = useContext(AuthContext);
    // console.log(userId, "user de profil")
    // console.log(isAuthenticated, "isAuthenticated de profil")
    return (
        <div>
            {isAuthenticated ? <div> <p>Oui</p>
                <div>
                    <h1>Voici votre profil ! </h1>
                    <h2> Id : {userId}</h2>
                    <h2>Prénom : {userFirstname}</h2>
                    <h2>Nom : {userLastname}</h2>
                    <h2>Email : {userEmail}</h2>
                    <h2>Rôle : {userRole}</h2>
                    <h2>Est connecté ? : {isAuthenticated ? "oui" : "non"}</h2>
                </div>
            </div>
                : <div>
                    <p>Veuillez vous connecter pour voir votre profil</p> <Login />
                </div>}

        </div>
    );
};

export default Profil;