import axios from 'axios';
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
import { NavLink } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const [emailNotFound, setEmailNotFound] = React.useState("")
  const [passwordNotFound, setPasswordNotFound] = React.useState("")

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`http://localhost:5000/api/user/login`, formData);
      const { token } = res.data;
      localStorage.setItem('token', token);
      console.log(token, "user")
      window.location.href = "/"
    } catch (err) {
      setEmailNotFound(err.response.data.errors.email)
      setPasswordNotFound(err.response.data.errors.password)
      console.error(err)
    }
  };

  return (
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            id="email"
            label="Email ou Numéro de téléphone"
            name="email"
            autoComplete="email"
            autoFocus
          />
          {emailNotFound === "" ? null : <h4>{emailNotFound}</h4>}
          <TextField
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {passwordNotFound === "" ? null : <p>{passwordNotFound}</p>}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Se souvenir de moi"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Se connecter
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Mot de passe oublié ?
              </Link>
            </Grid> */}
            <Grid item>
              <NavLink to="/register" >
                <Link href="#" variant="body2">
                  {"S'inscrire"}
                </Link>
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;