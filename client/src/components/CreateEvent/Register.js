import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

function Register() {
    const { isAuthenticated, nbMaxEvent, userId } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        title: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        companyName: '',
        address: '',
        role: 'creator',
    });

    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleConfirmPasswordChange = event => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Vérification de la validité des données avant de les envoyer au serveur
        let isValid = true;

        // Vérification de l'email ou du numéro de téléphone
        if (!formData.email && !formData.phone) {
            setEmailError("Veuillez fournir un email ou un numéro de téléphone");
            setPhoneError("Veuillez fournir un email ou un numéro de téléphone");
            isValid = false;
        } else {
            setEmailError("");
            setPhoneError("");
        }

        // Vérification du mot de passe
        if (!formData.password) {
            setPasswordError("Veuillez fournir un mot de passe");
            isValid = false;
        } else {
            setPasswordError("");
        }

        // Vérification de la confirmation de mot de passe
        if (!confirmPassword) {
            setConfirmPasswordError("Veuillez confirmer votre mot de passe");
            isValid = false;
        } else if (formData.password !== confirmPassword) {
            setConfirmPasswordError("Les mots de passe ne correspondent pas");
            isValid = false;
        } else {
            setConfirmPasswordError("");
        }

        // Si toutes les données sont valides, envoyer la requête au serveur
        if (isValid) {
            axios
                .post(`http://localhost:5000/api/user/register`, formData)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    setEmailError(err.response.data.errors.email);
                    setPhoneError(err.response.data.errors.phone);
                    setPasswordError(err.response.data.errors.password);
                    console.error(err);
                });
        }
    };

    return (
        <div>
            {isAuthenticated ? <p>Vous êtes connecté, veuillez vous déconnecter pour register</p> :
                <form onSubmit={handleSubmit}>
                    <label>
                        title:
                        <input type="text" name="title" value={formData.title} onChange={handleChange} />
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
                        Phone:
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </label>
                    {passwordError === "" ? null : <p>{passwordError}</p>}
                    <br />
                    <label>
                        Confirm Password:
                        <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                    </label>
                    {confirmPasswordError === "" ? null : <p>{confirmPasswordError}</p>}
                    <br />
                    <label>
                        Company Name:
                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Address:
                        <input type="text" name="address" value={formData.address} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Accepter les conditions d'utilisation:
                        <input type="checkbox" name="acceptedTerms" checked={acceptedTerms} onClick={() => setAcceptedTerms(true)} required />
                    </label>
                    <br />
                    <button type="submit">Register</button>
                </form>
            }
        </div>
    );
}

export default Register;