import React from 'react';

function Logout() {

    const handleSubmit = async (e) => {
        e.preventDefault()
        localStorage.removeItem('token');
        // window.location.reload()
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Logout</button>
        </form>
    );
}

export default Logout;
