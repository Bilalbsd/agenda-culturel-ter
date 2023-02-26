import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

function Register() {
    const { isAuthenticated } = React.useContext(AuthContext);
    const [formData, setFormData] = React.useState({
        role: 'creator',
    });

    const [emailError, setEmailError] = React.useState("");
    const [phoneError, setPhoneError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

    const [acceptedTerms, setAcceptedTerms] = React.useState(false);
    const [confirmPassword, setConfirmPassword] = React.useState("");

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
        console.log(formData.email, "formData.email");
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
        <>
            {isAuthenticated ? <p>Vous êtes connecté, veuillez vous déconnecter pour register</p> :
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Inscription
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField

                                        value={formData.title}
                                        onChange={handleChange}
                                        fullWidth
                                        id="title"
                                        label="Titre"
                                        name="title"
                                        autoComplete="title"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="Prénom"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Nom"
                                        name="lastname"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField

                                        value={formData.phone}
                                        onChange={handleChange}
                                        fullWidth
                                        id="phone"
                                        label="Numero de téléphone"
                                        name="phone"
                                        autoComplete="phone"
                                    />
                                </Grid>
                                {emailError === "" ? null : <p>{emailError}</p>}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        fullWidth
                                        name="password"
                                        label="Mot de passe"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                {passwordError === "" ? null : <p>{passwordError}</p>}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        fullWidth
                                        name="confirm-password"
                                        label="Confirmer Mot de passe"
                                        type="password"
                                        id="confirm-password"
                                        autoComplete="confirm-password"
                                    />
                                </Grid>
                                {confirmPasswordError === "" ? null : <p>{confirmPasswordError}</p>}
                                <Grid item xs={12}>
                                    <TextField

                                        value={formData.companyName}
                                        onChange={handleChange}
                                        fullWidth
                                        id="companyName"
                                        label="Nom de société"
                                        name="companyName"
                                        autoComplete="companyName"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField

                                        value={formData.address}
                                        onChange={handleChange}
                                        fullWidth
                                        id="address"
                                        label="Adresse"
                                        name="address"
                                        autoComplete="address"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="acceptedTerms" checked={acceptedTerms} color="primary" />}
                                            label="Accepter les conditions d'utilisation: "
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    S'inscrire
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            Se connecter
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            }
        </>
    );
}

export default Register;
