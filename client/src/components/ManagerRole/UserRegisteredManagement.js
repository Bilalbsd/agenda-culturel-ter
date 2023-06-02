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

    const handleUpdateRole = id => {
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
            })
            .catch(err => console.error(err));
    };

    const handleUpdateValidate = id => {
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
            })
            .catch(err => console.error(err));
    };

    const handleDelete = id => {
        axios
            .delete(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${id}`)
            .then(res => {
                setUsers(users.filter(user => user._id !== id));
                console.log(users, "users");
            })
            .catch(err => console.error(err));
    };

    // const ROWS_PER_PAGE = 5;

    // const [page, setPage] = useState(0);

    // const handlePageChange = (event, newPage) => {
    //     setPage(newPage);
    // };

    const filteredUsers = users.filter(user => user.role === 'registered');
    // const pageCount = Math.ceil(filteredUsers.length / ROWS_PER_PAGE);
    // const pageStartIndex = page * ROWS_PER_PAGE;
    // const pageEndIndex = (page + 1) * ROWS_PER_PAGE;

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <Container maxWidth="xl">
                        <Typography component="h1"
                            variant="h5"
                            color="text.primary"
                            gutterBottom>Gestionnaire des utilisateurs</Typography>
                        <TableContainer maxWidth="sm" style={{ height: '450px', overflowY: 'auto' }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Nom</TableCell>
                                        <TableCell>Prénom</TableCell>
                                        <TableCell>Rôle</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredUsers.map(user => (
                                        <TableRow key={user._id}>
                                            <TableCell>{user._id}</TableCell>
                                            <TableCell>{user.lastname}</TableCell>
                                            <TableCell>{user.firstname}</TableCell>
                                            {/* <TableCell>
                                                <Select value={user.isValidated} onChange={(e) => handleValidateChange(user._id, e.target.value)}>
                                                    <MenuItem value="true">Oui</MenuItem>
                                                    <MenuItem value="false">Non</MenuItem>
                                                </Select>
                                                <Button variant="contained" color="primary" onClick={() => handleUpdateValidate(user._id)}>Valider</Button>
                                            </TableCell> */}
                                            {/* <TableCell>
                                                <Select value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)}>
                                                    <MenuItem value="registered">Registered</MenuItem>
                                                    <MenuItem value="creator">Creator</MenuItem>
                                                    <MenuItem value="manager">Manager</MenuItem>
                                                    <MenuItem value="admin">Admin</MenuItem>
                                                </Select>
                                                <Button variant="contained" color="primary" onClick={() => handleUpdateRole(user._id)}>Valider</Button>
                                            </TableCell> */}
                                            <TableCell>{user.role}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <Button variant="contained" color="error" onClick={() => handleDelete(user._id)}>Supprimer</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
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