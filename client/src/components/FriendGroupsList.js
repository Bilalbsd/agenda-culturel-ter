import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { Avatar, Button, Card, CardActions, CardContent, Container, Grid, Slide, Typography, useScrollTrigger } from '@mui/material';
import { Box } from '@mui/system';

function FriendGroupsList() {
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);

    const { userId } = useContext(AuthContext);

    useEffect(() => {
        // Make two separate requests using Promise.all to fetch data in parallel
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
    }, [userId]);

    function handleDelete(groupNameToDelete) {
        const updatedGroups = groups.filter(group => group.groupName !== groupNameToDelete);
        axios
            .put(`http://localhost:5000/api/user/${userId}`, {
                groups: updatedGroups
            })
            .then(res => {
                setGroups(updatedGroups);
            })
            .catch(err => console.error(err));
    }


    return (
        <Container maxWidth="md">
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
                                <Button size="small">Éditer</Button>
                                <Button size="small" color="error" onClick={() => handleDelete(group.groupName)}>Supprimer</Button>
                            </CardActions>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Container>
    );
}

export default FriendGroupsList;
