import { Box, Modal, Typography } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Information() {
    const { userId, userRole, userFirstname, nbMaxEvent, isAuthenticated, firstConnection, setFirstConnection } = useContext(AuthContext);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (firstConnection && isAuthenticated && userRole ==='creator') {
            console.log(firstConnection, "firstConnection");
            try {
                axios.put(`http://localhost:5000/api/user/${userId}`, { firstConnection: false })
                    .then(res => {
                        setFirstConnection(res.data.firstConnection);
                        console.log(res.data, "res.data");
                    })
                    .catch(err => {
                        console.log(err);
                    });
                setOpen(true);
            } catch (err) {
                console.log(err);
            }
        }
    }, [userId]);



    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Bienvenue {userFirstname} ! {`test ${firstConnection}`} {userId}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default Information;
