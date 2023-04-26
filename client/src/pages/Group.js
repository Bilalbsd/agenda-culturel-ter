import React from 'react';
import FriendGroups from '../components/FriendGroups';
import NavBar from '../components/NavBar';
import FriendGroupsList from '../components/FriendGroupsList';
import Notification from '../components/Notification';
import AddFriend from '../components/AddFriend';

const Group = () => {
    return (
        <div>
            <NavBar />
            <br /> <br /> <br />
            <AddFriend />
            <FriendGroups />
            {/* <Notification /> */}
            {/* <FriendGroupsList /> */}
        </div>
    );
};

export default Group;