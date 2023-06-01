import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { some } from 'lodash';

const GoogleAuth = () => {

    const [user, setUser] = useState({});
    const [userRegister, setUserRegister] = useState({
        firstname: '',
        lastname: '',
        email: '',
        picture: '',
        role: '',
        password: ''
    });
    const [userLogin, setUserLogin] = useState({
        email: '',
        phone: '',
        password: '',
    });

    const [valid, setValid] = useState(false);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_API_URL}/api/user`)
            .then(res => setUsers(res.data));
    }, [users]);

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        let userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
        const userExists = users.some(u => u.email === userObject.email);

        if (userExists) {
            // User already exists, log them in
            setUserLogin({
                email: userObject.email,
                phone: "",
                password: "password123"
            });
        } else {
            // User does not exist, create a new account and log them in
            setUserRegister({
                firstname: userObject.given_name,
                lastname: userObject.family_name,
                email: userObject.email,
                picture: userObject.picture,
                role: "registered",
                password: "password123"
            });
            setUserLogin({
                email: userObject.email,
                phone: "",
                password: "password123"
            });
        }

        setValid(true);
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_API_URL}/api/user`).then((res) => {
            setUsers(res.data);
        });
    }, []);

    useEffect(() => {
        if (userRegister.email && valid) {
            const userExists = users.some(u => u.email === userRegister.email);

            if (userExists) {
                axios
                    .post(`${process.env.REACT_APP_SERVER_API_URL}/api/user/login`, userLogin)
                    .then((res) => {
                        const { token } = res.data;
                        localStorage.setItem("token", token);
                        console.log(token, "user");
                        window.location.href = "/";
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            } else {
                axios
                    .post(`${process.env.REACT_APP_SERVER_API_URL}/api/user/register`, userRegister)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.error(err);
                    });

                axios
                    .post(`${process.env.REACT_APP_SERVER_API_URL}/api/user/login`, userLogin)
                    .then((res) => {
                        const { token } = res.data;
                        localStorage.setItem("token", token);
                        console.log(token, "user");
                        window.location.href = "/";
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        }
    }, [valid, userLogin, userRegister, users]);

    function handleSignOut(event) {
        setUser({});
        setUserRegister({
            firstname: '',
            lastname: '',
            email: '',
            picture: '',
            role: '',
            password: ''
        });
        setUserLogin({
            email: '',
            phone: '',
            password: '',
        });
        setValid(false);
        document.getElementById("signInDiv").hidden = false;
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_CLIENT_ID_GOOGLE_AUTH,
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "xlarge" }
        );

        google.accounts.id.prompt();
    }, []);

    return (
        <div className="GoogleAuth">
            <div id="signInDiv" style={{ width: '50%', margin: '0 auto' }}></div>
            {/* {Object.keys(user).length !== 0 &&
                <button onClick={(e) => handleSignOut(e)}>Se déconnecter</button>
            } */}
            {/* {user &&
                <div>
                    <img src={user.picture} alt="Image du profil Google"></img>
                    <h1>{user.name}</h1>
                    <h2>{user.email}</h2>
                </div>
            } */}
        </div>
    );
};

export default GoogleAuth;
