import { Typography } from '@mui/material';
import React, { useContext } from 'react';
import NavBar from '../components/NavBar';
import EventManagement from '../components/ManagerRole/EventManagement';
import UserCreatorManagement from '../components/ManagerRole/UserCreatorManagement';
import UserRegisteredManagement from '../components/ManagerRole/UserRegisteredManagement';

import { AuthContext } from '../context/AuthContext';

function UserManagementPage() {

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
                    <UserRegisteredManagement />
                </div>
            }
        </div>
    );
}

export default UserManagementPage;