import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from "jotai";
import { tokenAtom } from "../App";
import { isValidToken } from "../utils/jwUtils";
import { userLogin } from '../services/apiUsers';

import { Container, Box, TextField, Button, Typography } from '@mui/material';
import SaversBar from '../components/SaversBar';

export default function LoginPage() {
    
    const setToken = useSetAtom(tokenAtom);
    const navigate = useNavigate();

    const [data, setData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (event) => {
        event.preventDefault(); 
        setError(''); // Clear previous error message
        try {
            const token = await userLogin(data); // Call the login function
            if (isValidToken(token)) {
                setToken(token);
                navigate('/rm-main');
              }
        } catch (error) {
            setError(error.message); // Set the error message to display
        }
    };

    return (
        <>
            <SaversBar />
            <h1 className='header'> Relationship Managers Only</h1>

            <Container className='loginPage' maxWidth='sm'>
                <Box component="form" noValidate autoComplete="off" onSubmit={handleLogin}>
                    <Typography variant='h4' sx={{ fontWeight: 700 }}>Login</Typography>
                    <p>Log in by entering your username and password</p>
                    {error && <Typography color="error">{error}</Typography>} 
                    <Box sx={{ marginBottom: 3, marginTop: 3 }}>
                        <TextField
                            id="username"
                            label="Username"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            value={data.username}
                            name="username"
                            onChange={handleChange}
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
                            value={data.password}
                            name="password"
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Container>
        </>
    );
}