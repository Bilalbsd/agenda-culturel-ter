
import React from 'react';
import EventDetail from '../components/EventDetail';
import FriendGroups from '../components/FriendGroups';
import NavBar from '../components/NavBar';

function Event() {
    return (
        <div>
            <NavBar />
            <EventDetail/>
            <FriendGroups />
        </div>
    );
}

export default Event;