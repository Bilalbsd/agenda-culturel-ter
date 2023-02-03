import React, { useContext } from 'react';
import Login from '../components/Login';
import Logout from '../components/Logout';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
    const { isAuthenticated } = useContext(AuthContext);
    console.log(isAuthenticated, "est connecté de login/logout")
    return (
        <div>
            <h2>Login</h2>
            {isAuthenticated ? <div> <p>Vous êtes connecté !</p> <Logout /></div> : <div> <p>Connectez-vous !</p> <Login /></div>}
        </div>
    );
}

export default LoginPage;