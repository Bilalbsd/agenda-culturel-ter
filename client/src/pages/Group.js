import React from 'react';
import FriendGroups from '../components/FriendGroups';
import NavBar from '../components/NavBar';
import FriendGroupsList from '../components/FriendGroupsList';

const Group = () => {
    return (
        <div>
            <NavBar />
            <br /> <br /> <br />
            <FriendGroups />
            <FriendGroupsList />
        </div>
    );
};

export default Group;