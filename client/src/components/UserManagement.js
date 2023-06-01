import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function UserManagement() {
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

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <h2>Gestionnaire d'utilisateur</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Validé</th>
                                <th>Rôle</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.firstname}</td>
                                    {/* <td>{user.isValidated ? "oui" : "non"}</td> */}
                                    <td>
                                        <select value={user.isValidated} onChange={e => handleValidateChange(user._id, e.target.value)}>
                                            <option value="true">Oui</option>
                                            <option value="false">Non</option>
                                        </select>
                                        <button onClick={() => handleUpdateValidate(user._id)}>Valider</button>
                                    </td>
                                    <td>
                                        <select value={user.role} onChange={e => handleRoleChange(user._id, e.target.value)}>
                                            <option value="registered">Registered</option>
                                            <option value="creator">Creator</option>
                                            <option value="manager">Manager</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        <button onClick={() => handleUpdateRole(user._id)}>Valider</button>
                                    </td>
                                    {/* <td>{user.role}</td> */}
                                    <td>{user.email}</td>
                                    <td>
                                        <button onClick={() => handleDelete(user._id)}>Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h2>Vous n'avez pas les permissions de voir cette page !</h2>
            )}
        </div>
    );
}

export default UserManagement;