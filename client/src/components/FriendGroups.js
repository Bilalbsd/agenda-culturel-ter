import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { Autocomplete, Button, Container, Grid, TextField, Typography } from '@mui/material';
import FriendGroupsList from './FriendGroupsList';
import { Box } from '@mui/system';

function FriendGroups() {
    const [users, setUsers] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [allGroups, setAllGroups] = useState([]);
    const [searchInput, setSearchInput] = useState(''); // ajout de l'état pour stocker la valeur de la recherche
    const [isGroupNameValid, setIsGroupNameValid] = useState(true);


    const { userId, userRole, userFirstname, nbMaxEvent, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        // Récupérer tous les utilisateurs depuis la base de données
        axios.get('http://localhost:5000/api/user')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        // Récupérer les groupes d'amis de l'utilisateur courant depuis la base de données
        axios.get(`http://localhost:5000/api/user/${userId}`)
            .then(response => {
                setAllGroups(response.data.groups);
                console.log(response.data.groups, "allGroups");
            })
            .catch(error => {
                console.log(error);
            });
    }, [userId]);

    const validateGroupName = () => {
        setIsGroupNameValid(
            allGroups.findIndex(group => group.groupName === groupName) === -1
        );
    };

    const handleGroupNameChange = event => {
        // Mettre à jour le nom du groupe avec la valeur de l'input
        setGroupName(event.target.value);
        validateGroupName();
    };

    const handleFriendSelection = (event, values) => { // modification de la fonction de sélection d'amis pour prendre en compte la valeur sélectionnée
        setSelectedFriends(values.map(value => value._id));
    };



    const handleSubmit = event => {
        event.preventDefault();

        if (!isGroupNameValid) {
            return;
        }

        const newGroup = {
            groupName: groupName,
            members: selectedFriends
        };

        // Ajouter le nouveau groupe d'amis à la liste des groupes de l'utilisateur courant dans la base de données
        axios.put(`http://localhost:5000/api/user/${userId}`, {
            groups: [...allGroups, newGroup]
        })
            .then(response => {
                setAllGroups([...allGroups, newGroup]);
                console.log(response.data);
                setGroupName('');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const filteredUsers = users.filter(user => {
        const regex = new RegExp(searchInput, 'gi');
        return regex.test(user.firstname);
    }); // ajout d'une variable qui contient la liste des utilisateurs filtrés selon la recherche

    return (
        <Container maxWidth="md">
            <Box>
                <Typography variant="h4">Créer un groupe d'amis</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={3}>
                            {/* <Typography variant="h6"><label htmlFor="group-name">Nom du groupe :</label></Typography> */}
                            <TextField
                                id="group-name"
                                label="Nom du groupe"
                                value={groupName}
                                onChange={handleGroupNameChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            {/* <Typography variant="h6">Amis :</Typography> */}
                            <Autocomplete
                                multiple
                                id="friends-autocomplete"
                                options={filteredUsers}
                                getOptionLabel={(option) => option.firstname}
                                onChange={handleFriendSelection}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Rechercher un ami"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" color="primary">
                        Créer le groupe
                    </Button>
                </form>
            </Box >
        </Container >
    );
}

export default FriendGroups;
