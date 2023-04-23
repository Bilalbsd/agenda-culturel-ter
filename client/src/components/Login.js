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
import { MuiTelInput } from 'mui-tel-input';
import GoogleAuth from './GoogleAuth';
import { FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login() {
  const [formData, setFormData] = React.useState({
    email: '',
    phone: '',
    password: '',
  });

  const [emailNotFound, setEmailNotFound] = React.useState("");
  const [errorIdentifier, setErrorIdentifier] = React.useState("");
  const [passwordNotFound, setPasswordNotFound] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = phone => {
    if (typeof phone === "string") {
      setFormData({ ...formData, phone });
    }
  };

  console.log(formData, "formData");

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
      setErrorIdentifier(err.response.data.errors.identifier)
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
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Grid item xs={12}>
            <MuiTelInput id="phone" label="Phone" name="phone" value={formData.phone} onChange={handlePhoneChange} fullWidth defaultCountry='FR' />
          </Grid>
          {emailNotFound === "" ? null : <h4>{emailNotFound}</h4>}
          {errorIdentifier === "" ? null : <h4>{errorIdentifier}</h4>}
          <TextField
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {passwordNotFound === "" ? null : <p>{passwordNotFound}</p>}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Se souvenir de moi"
          /> */}
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
              <GoogleAuth />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container >
  );
}

export default Login;