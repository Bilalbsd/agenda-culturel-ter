import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, Button, Pagination, TableContainer, Typography } from '@mui/material';
import { Container } from '@mui/system';

function UserCreatorManagement() {
    const [users, setUsers] = useState([]);
    const { isAuthenticated, userRole } = useContext(AuthContext);
    const [selectedRole, setSelectedRole] = useState({});
    const [validation, setValidation] = useState({});


    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_API_URL}/api/user/`)
            // .then(res => console.log(res.data))
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }, [userRole]);

    const handleRoleChange = (id, role) => {
        setSelectedRole({ ...selectedRole, [id]: role });
        console.log(selectedRole)
    };

    const handleValidateChange = (id, validate) => {
        setValidation({ ...validation, [id]: validate });
        console.log(validation)
    };

    // const handleUpdateRole = id => {
    //     axios
    //         .put(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${id}`, { role: selectedRole[id] })
    //         .then(res => {
    //             setUsers(
    //                 users.map(user => {
    //                     if (user._id === id) {
    //                         return { ...user, role: selectedRole[id] };
    //                     }
    //                     return user;
    //                 })

    //             );
    //         })
    //         .catch(err => console.error(err));
    // };

    // const handleUpdateValidate = id => {
    //     axios
    //         .put(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${id}`, { isValidated: validation[id] })
    //         .then(res => {
    //             setUsers(
    //                 users.map(user => {
    //                     if (user._id === id) {
    //                         return { ...user, isValidated: validation[id] };
    //                     }
    //                     return user;
    //                 })

    //             );
    //         })
    //         .catch(err => console.error(err));
    // };

    useEffect(() => {
        // Effectue la mise à jour du rôle pour tous les utilisateurs dont l'ID est présent dans l'état selectedRole
        Object.keys(selectedRole).forEach(id => {
            axios
                .put(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${id}`, { role: selectedRole[id] })
                .then(res => {
                    setUsers(
                        users.map(user => {
                            if (user._id === id) {
                                return { ...user, role: selectedRole[id] };
                            }
                            return user;
                        })
                    );
                    console.log(res.data, "res1")
                })
                .catch(err => console.error(err));
        });
    }, [selectedRole]);

    useEffect(() => {
        // Effectue la mise à jour de la validation pour tous les utilisateurs dont l'ID est présent dans l'état validation
        Object.keys(validation).forEach(id => {
            axios
                .put(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${id}`, { isValidated: validation[id] })
                .then(res => {
                    setUsers(
                        users.map(user => {
                            if (user._id === id) {
                                return { ...user, isValidated: validation[id] };
                            }
                            return user;

                        })
                    );
                    console.log(res.data, "res2")
                })
                .catch(err => console.error(err));
        });
    }, [validation]);

    const handleValidation = async (user) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${user._id}`, {
                ...user,
                isValidated: true
            });
            const updatedUser = response.data;
            setUsers(prevState => prevState.map(u => {
                if (u._id === updatedUser._id) {
                    return updatedUser;
                }
                return u;
            }));
            console.log(response.data); // pour déboguer
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = id => {
        axios
            .delete(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${id}`)
            .then(res => {
                setUsers(users.filter(user => user._id !== id));
                console.log(users, "users");
            })
            .catch(err => console.error(err));
    };

    const filteredUsers = users.filter(user => user.role === 'creator');

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <Container maxWidth="xl">
                        <Typography component="h1"
                            variant="h5"
                            color="text.primary"
                            gutterBottom>Gestionnaire des créateurs</Typography>
                        <TableContainer maxWidth="sm" style={{ height: '450px', overflowY: 'auto' }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Nom</TableCell>
                                        <TableCell>Prénom</TableCell>
                                        <TableCell>Validé</TableCell>
                                        <TableCell>Rôle</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredUsers.map(user => {
                                        return (
                                            <TableRow key={user._id}>
                                                <TableCell>{user._id}</TableCell>
                                                <TableCell>{user.lastname}</TableCell>
                                                <TableCell>{user.firstname}</TableCell>
                                                <TableCell>
                                                    {user.isValidated ? (
                                                        <Button variant="contained" color="primary" disabled>
                                                            Validé
                                                        </Button>
                                                    ) : (
                                                        <Button variant="contained" color="primary" onClick={() => handleValidation(user)}>
                                                            Valider
                                                        </Button>
                                                    )}
                                                </TableCell>
                                                <TableCell>{user.role}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>
                                                    <Button variant="contained" color="error" onClick={() => handleDelete(user._id)}>Supprimer</Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* <Pagination count={pageCount} page={page} onChange={handlePageChange} /> */}
                    </Container>
                </div>
            ) : (
                <h2>Vous n'avez pas les permissions de voir cette page !</h2>
            )}
        </div>
    );
}
export default UserCreatorManagement;