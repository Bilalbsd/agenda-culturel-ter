import React from 'react';
import Profil from '../components/Profil';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';


function ProfilePage() {
    return (
        <div>
            <NavBar />
            <br /> <br /> <br />
            <Profil />
            <Footer />
        </div>
    );
}
export default ProfilePage;