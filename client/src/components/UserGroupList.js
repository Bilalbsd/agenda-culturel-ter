import React, { useEffect, useState } from "react";
import axios from "axios";

function UserGroupList() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/user")
            .then(response => {
                setGroups(response.data);
                console.log(groups, "response")
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h1>User Groups</h1>
            <ul>
                {groups.map(group => (
                    <li key={group._id}>
                        {group.firstname} ({group.length} users)
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserGroupList;
