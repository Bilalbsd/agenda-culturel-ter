import React, { useContext } from 'react';
import EventManagement from '../components/EventManagement';
import UserManagement from '../components/UserManagement';

import { AuthContext } from '../context/AuthContext';

function ManagementPage() {

  const { userRole } = useContext(AuthContext);

    console.log(userRole, "userRole")
    return (
        <div>
            {userRole !== "manager" ? <h1>Vous ne pouvez pas accéder à cette partie du site !</h1> :
                <div>
                    <h2>Gestionnaire</h2>
                    <UserManagement />
                    <br />
                    <EventManagement />
                </div>
            }
        </div>
    );
}

export default ManagementPage;