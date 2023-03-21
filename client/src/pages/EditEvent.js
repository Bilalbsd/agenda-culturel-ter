import React from 'react';
import NavBar from '../components/NavBar';
import EditEvent from '../components/EditEvent';
import Footer from '../components/Footer';


function EditEventPage() {
    return (
        <div>
            <NavBar />
            <br /> <br />
            <EditEvent />
            <Footer />
        </div>
    );
}

export default EditEventPage;
