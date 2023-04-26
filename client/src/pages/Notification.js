import React from 'react';
import NavBar from '../components/NavBar';
import Notifications from '../components/Notifications';
import Footer from '../components/Footer';

const NotificationPage = () => {
    return (
        <div>
            <NavBar />
            <Notifications />
            {/* <Footer /> */}
        </div>
    );
};

export default NotificationPage;