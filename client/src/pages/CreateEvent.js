import React, { useContext } from 'react';
import CreateEvent from '../components/CreateEvent';
import { AuthContext } from '../context/AuthContext';

function CreateEventPage() {
    // const { isAuthenticated, userRole } = useContext(AuthContext);
    return (
        <div>
            <h2>Create Event</h2>
            {/* {isAuthenticated ? userRole === "creator" ? <div> <CreateEvent /></div> : <h1>Vous n'avez pas les permissions nécessaires pour accéder à cette page vous allez être rediriger dans 3 secondes...</h1> : <h1>Veuillez vous connecter</h1>} */}
            <CreateEvent />
        </div>

    )
};


export default CreateEventPage;