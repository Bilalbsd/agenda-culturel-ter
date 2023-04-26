import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="">
                Agenda Culturel
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function StickyFooter() {
    return (
        <>
            <br /> <br /> <br />
            <Box
                component="footer"
                sx={{
                    py: 5,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                    textAlign: 'center'
                }}
            >

                <Container maxWidth="sm">
                    <Typography variant="body1">
                        Ceci est le footer du site...
                    </Typography>
                    <Copyright />
                </Container>
            </Box>
        </>
    );
}