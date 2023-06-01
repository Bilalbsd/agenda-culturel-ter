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
import CheckIcon from '@mui/icons-material/Check';

import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { Alert, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';

function Register() {
    const { isAuthenticated } = React.useContext(AuthContext);
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [phone, setPhone] = React.useState('');
    const [formData, setFormData] = React.useState({
        // Le rôle de base pour tout utilisateur sera 'registered' jusqu'à la modification par un gestionnaire
        role: 'creator',
    });

    console.log(formData, "formData");

    const generateRandomEmail = () => {
        const randomString = Math.random().toString(36).substring(2, 8);
        return `${randomString}@example.com`;
    };

    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
    const [phoneError, setPhoneError] = React.useState("");

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhoneChange = phone => {
        if (typeof phone === "string") {
            setFormData({ ...formData, phone });
        }
    };

    const handleConfirmPasswordChange = event => {
        setConfirmPassword(event.target.value);
    };

    const validateEmail = email => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    };

    const handleSubmit = e => {
        e.preventDefault();
        const { firstname, lastname, email, phone, password } = formData;

        if (!email && !phone) {
            setEmailError("Veuillez entrer un email ou un numéro de téléphone");
            setPhoneError("Veuillez entrer un email ou un numéro de téléphone");
        } else {
            setEmailError("");
            setPhoneError("");
        }

        if (!email) {
            const randomEmail = generateRandomEmail();
            setFormData({ ...formData, email: randomEmail });
        }

        if (email && !validateEmail(email)) {
            setEmailError("Veuillez entrer une adresse email valide");
        }

        if (phone && !validatePhone(phone)) {
            setPhoneError("Veuillez entrer un numéro de téléphone valide");
        }

        let isValid = true;

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

        if (isValid) {
            axios
                .post(`${process.env.REACT_APP_SERVER_API_URL}/api/user/register`, formData)
                .then(res => {
                    console.log(res);
                    window.location.href = "/login";
                })
                .catch(err => {
                    console.error(err);
                });
        }
    };


    const validatePhone = phone => {
        const re = /^\d{10}$/;
        return re.test(phone);
    };

    console.log(phone, "phone");

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                                        // required
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
                                    <MuiTelInput id="phone" label="Phone" name="phone" value={formData.phone} onChange={handlePhoneChange} fullWidth defaultCountry='FR' />
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
                                    <FormControlLabel
                                        required
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label={
                                            <Link href="#" onClick={handleOpen}>
                                                Accepter les conditions d'utilisation
                                            </Link>
                                        }
                                    />
                                    <Dialog open={open} onClose={handleClose} maxWidth="sm">
                                        <DialogTitle>Conditions d'utilisation</DialogTitle>
                                        <DialogContent dividers>
                                            <DialogContentText>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut
                                                lectus et ante luctus tincidunt. Vestibulum ante ipsum primis in
                                                faucibus orci luctus et ultrices posuere cubilia curae; Duis
                                                bibendum, tellus vel hendrerit faucibus, odio magna hendrerit augue,
                                                sit amet tristique metus turpis eget massa. Proin vel ipsum sit amet
                                                lorem aliquet porttitor. Sed at sapien nec odio sagittis molestie.
                                                Nulla facilisi. Aenean non velit luctus, luctus risus in, lobortis
                                                nibh. Vestibulum ut malesuada lectus. Sed nec turpis eget lacus
                                                finibus porttitor ac eu mauris. Vestibulum lacinia libero id quam
                                                tincidunt aliquet. Sed consectetur nulla nec enim mollis, vel
                                                facilisis dolor sollicitudin. Ut ac ipsum in enim venenatis aliquam.
                                                Nulla facilisi. Duis bibendum velit id sem faucibus, at ultricies
                                                massa pellentesque. Nam iaculis tellus nec turpis tristique, eget
                                                auctor lectus scelerisque. Donec vehicula semper ex, vitae dapibus
                                                nunc fermentum eu. Integer blandit libero a enim ullamcorper, ac
                                                vehicula dolor euismod. Donec efficitur, velit eu pretium semper,
                                                quam leo mattis mi, vel placerat neque est a ante. Fusce vel nisl
                                                suscipit, convallis velit vel, pretium sapien. Sed non metus vel
                                                erat pulvinar egestas. Nam eu elit eget enim dignissim malesuada.
                                                Duis dignissim massa a posuere lobortis. Vestibulum ante ipsum primis
                                                in faucibus orci luctus et ultrices posuere cubilia curae; In
                                                venenatis augue eget eros tristique, id consectetur dolor pulvinar.
                                                Vivamus dictum bibendum dolor eu scelerisque. Duis quis quam eget
                                                ipsum fermentum gravida. Maecenas vitae faucibus sapien. Nullam
                                                tincidunt libero ut magna cursus, vel iaculis ipsum posuere.
                                                Praesent ac dui nulla. Quisque lobortis est et sapien.
                                            </DialogContentText>
                                        </DialogContent>
                                    </Dialog>
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
                                    <NavLink to={`/login`} style={{ textDecoration: 'none' }}>
                                        <Link variant="body2">
                                            Se connecter
                                        </Link>
                                    </NavLink>
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
