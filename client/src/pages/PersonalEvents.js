import React from 'react';
import EventDetail from '../components/EventDetail';
import NavBar from '../components/NavBar';
import EventsList from '../components/EventsList';
import PersonalEvents from '../components/CreateEvent/PersonalEvents';

function Events() {
    return (
        <div>
            <NavBar />
            <PersonalEvents />
        </div>
    );
}

export default Events;