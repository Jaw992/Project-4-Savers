import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from "jotai";
import { tokenAtom } from "../App";
import { isValidToken } from "../utils/jwUtils";
import { userLogin } from '../services/apiUsers';

import { Container, Box, TextField, Button, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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
        setError(''); 
        try {
            const token = await userLogin(data);
            if (isValidToken(token)) {
                setToken(token);
                navigate('/client-main');
              }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleNew = () => {
        navigate("/sign-up");
    };

    return (
        <>
        <div className='background'>
            <h1 className='header'> Where saving have never been easier! <ThumbUpIcon fontSize='lg'/></h1>

            <Container className='loginPage' maxWidth='sm'>
                <Box component="form" noValidate autoComplete="off" onSubmit={handleLogin} sx={{ color: 'white' }}>
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
                            sx={{
                                label: {
                                  color: 'lightblue',
                                },
                                input: {
                                  color: 'white',
                                },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'white',
                                    borderWidth: 2,  
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'lightyellow',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: 'white',  
                                  },
                                },
                              }}
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
                            sx={{
                                label: {
                                  color: 'lightblue',
                                },
                                input: {
                                  color: 'white',
                                },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'white',
                                    borderWidth: 2,  
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'lightyellow',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: 'white',  
                                  },
                                },
                              }}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ width: 300, mt: 2 }}
                    >
                        Sign In
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ 
                            width: 300,
                            color: 'lightblue',               
                            borderColor: 'white',
                            borderWidth: 2,    
                            '&:hover': {
                              backgroundColor: 'navy', 
                              borderColor: 'white',   
                            },mt: 2 
                        }}
                        onClick={handleNew}
                    >
                        New Account
                    </Button>
                </Box>
            </Container>
            </div>
        </>
    );
}