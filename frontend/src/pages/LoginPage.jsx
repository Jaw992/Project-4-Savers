import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';

import SaversBar from '../components/SaversBar';
import Footer from "../components/Footer";


export default function LoginPage() {
    
    return (
        <>
            <SaversBar />
            <h1> In Savers you trust.</h1>
            
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
                        <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            type="submit"
                            sx={{ mt: 2 }}
                            onClick=""
                        >
                        New Account
                        </Button>
                    </Box>
                </Container>
            </div>

            <Footer />
        </>
    )
}