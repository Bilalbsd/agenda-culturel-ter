import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { Autocomplete, Avatar, Button, Card, CardActions, CardContent, Container, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';


function FriendGroups() {
    const [users, setUsers] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [allGroups, setAllGroups] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [isGroupNameValid, setIsGroupNameValid] = useState(true);
    const [nbGroups, setNbGroups] = useState(0);

    const { userId, userRole, userFirstname, nbMaxEvent, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        axios.get('http://localhost:5000/api/user')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/user/${userId}`)
            .then(response => {
                setAllGroups(response.data.groups);
                setNbGroups(response.data.groups.length);
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
        setGroupName(event.target.value);
        validateGroupName();
    };

    const handleFriendSelection = (event, values) => {
        setSelectedFriends(values.map(value => value._id));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isGroupNameValid) {
            return;
        }

        const newGroup = {
            groupName: groupName,
            members: selectedFriends,
        };

        // if (allGroups.length >= 3) {
        //     // Limite de groupes atteinte
        //     console.log("Limite de  groupes atteinte");
        //     return;
        // }

        // Ajouter le nouveau groupe d'amis à la liste des groupes de l'utilisateur courant dans la base de données
        axios
            .put(`http://localhost:5000/api/user/${userId}`, {
                groups: [...allGroups, newGroup],
            })
            .then((response) => {
                setAllGroups([...allGroups, newGroup]);
                console.log(response.data);
                setGroupName("");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const filteredUsers = users.filter(user => {
        const regex = new RegExp(searchInput, 'gi');
        return regex.test(user.firstname);
    }); // ajout d'une variable qui contient la liste des utilisateurs filtrés selon la recherche


    const [groups, setGroups] = useState([]);

    useEffect(() => {
        Promise.all([
            axios.get(`http://localhost:5000/api/user`),
            axios.get(`http://localhost:5000/api/user/${userId}`)
        ])
            .then(([usersResponse, groupsResponse]) => {
                setUsers(usersResponse.data);
                setGroups(groupsResponse.data.groups);
            })
            .catch(error => {
                console.error(error);
            });
    }, [userId, groups]);

    function handleDelete(groupNameToDelete) {
        const updatedGroups = groups.filter(group => group.groupName !== groupNameToDelete);
        axios
            .put(`http://localhost:5000/api/user/${userId}`, {
                groups: updatedGroups
            })
            .then(res => {
                setGroups(updatedGroups);
                console.log(res.data, "updatedGroups");
            })
            .catch(err => console.error(err));
    }

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
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {groups.map((group, index) => (
                    <Box key={group.groupName} sx={{ maxWidth: 345, flexGrow: 1, margin: '0 10px 20px 10px' }}>
                        <Card sx={{ height: '100%', position: 'relative' }}>
                            <CardContent sx={{ height: 'calc(100% - 60px)', overflowY: 'auto' }}>
                                <div>
                                    <Typography variant="h6" component="h2">
                                        {group.groupName}
                                    </Typography>
                                    <ul style={{ maxHeight: '250px', minHeight: '100px', paddingInlineStart: '10px' }}>
                                        {group.members.map((memberId) => {
                                            const user = users.find((u) => u._id === memberId);
                                            return user ? (
                                                <Box key={user._id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <Avatar alt={user.firstname} src="/static/images/avatar/1.jpg" sx={{ mr: 2 }} />
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{user.firstname}</Typography>
                                                </Box>
                                            ) : null;
                                        })}
                                    </ul>
                                </div>
                            </CardContent>
                            <CardActions sx={{ position: 'absolute', bottom: 0 }}>
                                <Button size="small">Partager</Button>
                                <Button size="small" color="error" onClick={() => handleDelete(group.groupName)}>Supprimer</Button>
                            </CardActions>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Container>
    );
}

export default FriendGroups;
