import React, { useContext } from 'react';
import Login from '../components/Login';
import NavBar from '../components/NavBar';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
    const { isAuthenticated } = useContext(AuthContext);
    console.log(isAuthenticated, "est connecté de login/logout")
    return (
        <div>
            <NavBar />
            <Login />
        </div>
    );
}

export default LoginPage;