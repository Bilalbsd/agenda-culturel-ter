import React from 'react';
import Profil from '../components/Profil';
import NavBar from '../components/NavBar';
import Localisation from '../components/Localisation';
import EventsMap from '../components/EventsMap';

function ProfilePage() {
    return (
        <div>
            <NavBar />
            <br /> <br /> <br />
            {/* <EventsMap /> */}
            {/* <Localisation /> */}
            <Profil />
        </div>
    );
}
export default ProfilePage;