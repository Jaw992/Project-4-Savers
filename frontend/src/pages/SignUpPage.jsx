import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Paper, Button, Typography } from '@mui/material';
import { userSignup } from '../services/apiUsers';

export default function SignUpPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        contact: '',
        role: 'client',
    });

    const [error, setError] = useState('');
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        
        try {
            const token = await userSignup(formData);
            console.log('User signed up successfully! Token: ', token); //? Console.log
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Container className='signupPage' maxWidth='sm'>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Paper elevation={10} sx={{ padding: 6 }}>
                    <Typography variant='h5' sx={{ fontWeight: 500 }}>New User Details</Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    <Box sx={{ marginBottom: 2, marginTop: 2 }}>
                        <TextField
                            id="username"
                            label="Username"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            id="password"
                            label="Password"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            id="name"
                            label="Name"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            id="email"
                            label="Email"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            id="contact"
                            label="Contact Number"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            type="number"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Typography variant="body2" sx={{ marginBottom: 1 }}>
                        By signing up, you agree to the terms and conditions. 
                    </Typography>
                    <Button
                        size='large'
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: 2 }}
                    >
                        Sign Up
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
}