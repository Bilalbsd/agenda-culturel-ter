import React from 'react';
import { NavLink } from 'react-router-dom';

function Logout() {

    const handleSubmit = async (e) => {
        e.preventDefault()
        localStorage.removeItem('token');
        // window.location.reload()
    };

    return (
        <form onSubmit={handleSubmit}>
            <NavLink to={`/`} style={{ textDecoration: 'none' }}>
                <button type="submit">Logout</button>
            </NavLink>
        </form>
    );
}

export default Logout;
