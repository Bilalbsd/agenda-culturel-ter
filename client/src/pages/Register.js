import React, { useState } from 'react';
import Register from '../components/Register';
import RegisterCreator from '../components/CreateEvent/Register';
import NavBar from "../components/NavBar";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

function RegisterPage() {
  const [showRegisterCreator, setShowRegisterCreator] = useState(false);

  const handleRegisterClick = () => {
    setShowRegisterCreator(false);
  };

  const handleRegisterCreatorClick = () => {
    setShowRegisterCreator(true);
  };

  return (
    <div>
      <NavBar />
      <Grid container>
        <Grid item xs={6} md={3}>
          <Box m={2}>
            <Container maxWidth="md">
              <Button variant="outlined" onClick={handleRegisterClick}>Inscription</Button>
              <Button variant="outlined" onClick={handleRegisterCreatorClick}>Inscription Créateur</Button>
            </Container>
          </Box>
        </Grid>
      </Grid>
      {showRegisterCreator ? <RegisterCreator /> : <Register />}
    </div>
  );
}

export default RegisterPage;
