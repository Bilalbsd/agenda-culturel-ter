import React, { useContext } from 'react';
import Login from '../components/Login';
import NavBar from '../components/NavBar';
import { AuthContext } from '../context/AuthContext';
import GoogleAuth from '../components/GoogleAuth';

function LoginPage() {
    const { isAuthenticated } = useContext(AuthContext);
    console.log(isAuthenticated, "est connecté de login/logout")
    return (
        <div>
            <NavBar />
            <Login />
            {/* <GoogleAuth /> */}
        </div>
    );
}

export default LoginPage;