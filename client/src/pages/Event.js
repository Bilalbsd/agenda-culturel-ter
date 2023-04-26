
import React from 'react';
import EventDetail from '../components/EventDetail';
// import FriendGroups from '../components/FriendGroups';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';


function Event() {
    return (
        <div>
            <NavBar />
            <EventDetail />
            {/* <FriendGroups /> */}
            <Footer />
        </div>
    );
}

export default Event;