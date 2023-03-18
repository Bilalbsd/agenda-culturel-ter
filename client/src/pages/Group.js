import React from 'react';
import FriendGroups from '../components/FriendGroups';
import NavBar from '../components/NavBar';
import FriendGroupsList from '../components/FriendGroupsList';
import Notification from '../components/Notification';

const Group = () => {
    return (
        <div>
            <NavBar />
            <br /> <br /> <br />
            <FriendGroups />
            {/* <Notification /> */}
            {/* <FriendGroupsList /> */}
        </div>
    );
};

export default Group;