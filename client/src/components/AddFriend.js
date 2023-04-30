import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const AddFriend = () => {
    const { userId } = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [thisUser, setThisUser] = useState([]);
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState('');
    const [friendList, setFriendList] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/user`)
            .then(res => {
                setUsers(res.data);
                setFriendList(res.data.friendList);
            });
        axios.get(`http://localhost:5000/api/user/${userId}`)
            .then(res => {
                setThisUser(res.data);
            });
    }, [userId]);

    const handleAddFriend = () => {
        const userToAdd = users.find(user => user.email === email);
        console.log(userToAdd);
        if (userToAdd) {

            const newFriend = {
                friend_id: thisUser._id,
                accepted: false
            };

            axios.put(`http://localhost:5000/api/user/${userToAdd}`, {
                friendList: [...friendList, newFriend]
            }).then(res => {
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            });
        } else {
            setResponse('Utilisateur introuvable');
        }

        const newFriendMe = {
            friend_id: userToAdd._id,
            accepted: true
        };

        axios.put(`http://localhost:5000/api/user/${userId}`, {
            friendList: [...friendList, newFriendMe]
        }).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div>
            <input type="email" placeholder="Entrez l'adresse email de l'utilisateur" onChange={e => setEmail(e.target.value)} />
            <p>{response}</p>
            <button onClick={handleAddFriend}>Ajouter</button>
        </div>
    );
};

export default AddFriend;