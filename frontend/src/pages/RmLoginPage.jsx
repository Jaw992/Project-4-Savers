import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';

import SaversBar from '../components/SaversBar';

export default function RmLoginPage() {
    
    return (
        <>
            <SaversBar />
            <h1 className='header'> Relationship Managers Only</h1>
            <div className='loginPage'>
                <Container className='loginBox' maxWidth='sm'>
                    <Box component="form" noValidate autoComplete="off">
                        <Typography variant='h4' sx={{ fontWeight: 700 }}>Login</Typography>
                        <p>Log in by entering your username and password</p>
                        <Box sx={{ marginBottom: 3, marginTop: 3 }}>
                            <TextField
                                id="username"
                                label="Username"
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                value=""
                                name="username"
                                onChange=""
                                required
                                />
                        </Box>
                        <Box sx={{ marginBottom: 3 }}>
                            <TextField
                                id="password"
                                label="Password"
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                type="password"
                                value=""
                                name="password"
                                onChange=""
                                required
                            />
                        </Box>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{ mt: 2 }}
                            onClick=""
                        >
                        Sign In
                        </Button>
                    </Box>
                </Container>
            </div>
        </>
    )
}