import { Typography } from '@mui/material';
import React, { useContext } from 'react';
import NavBar from '../components/NavBar';
import EventManagement from '../components/EventManagement';
import UserCreatorManagement from '../components/UserCreatorManagement';
import UserRegisteredManagement from '../components/UserRegisteredManagement';

import { AuthContext } from '../context/AuthContext';

function ManagementPage() {

    const { userRole } = useContext(AuthContext);

    console.log(userRole, "userRole")
    return (
        <div>
            {userRole !== "manager" ? <h1>Vous ne pouvez pas accéder à cette partie du site !</h1> :
                <div>
                    <NavBar />
                    <br />
                    <Typography component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom>Gestionnaire
                    </Typography>
                    <UserCreatorManagement />
                    <br /> <br /> <br />
                    <UserRegisteredManagement />
                    <br />
                    <EventManagement />
                </div>
            }
        </div>
    );
}

export default ManagementPage;