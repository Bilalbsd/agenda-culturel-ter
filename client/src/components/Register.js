import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Register() {
    const { isAuthenticated } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        // Le rôle de base pour tout utilisateur sera 'registered' jusqu'à la modification par un gestionnaire
        role: 'registered',
    });

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/user/register', formData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                setEmailError(err.response.data.errors.email)
                setPasswordError(err.response.data.errors.password)
                console.error(err)
            });
    };

    return (
        <div>
            {isAuthenticated ? <p>Vous êtes connecté, veuillez vous déconnecter pour register</p> :
                <form onSubmit={handleSubmit}>
                    <label>
                        Firstname:
                        <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Lastname:
                        <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </label>
                    {emailError === "" ? null : <p>{emailError}</p>}
                    <br />
                    <label>
                        Password:
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    </label>
                    {passwordError === "" ? null : <p>{passwordError}</p>}
                    <br />
                    <button type="submit">Register</button>
                </form>
            }
        </div>
    );
}

export default Register;