import { Container, Box, TextField, Paper, Button, Typography } from '@mui/material';

import SaversBar from '../components/SaversBar';

export default function SignUpPage() {

    return(
        <>
            <SaversBar />
            
            <Container className='signupPage' maxWidth='sm'>
                <Box className='detailsBox' component="form" noValidate autoComplete="off">
                <Paper elevation={10} sx={{ padding: 6}}>    
                    <Typography variant='h5' sx={{ fontWeight: 500 }}>New User Details</Typography>
                    <Box sx={{ marginBottom: 2, marginTop: 2 }}>
                        <TextField
                        id="username"
                        label="Username"
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        type="text"
                        name="username"
                        value=''
                        onChange=''
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
                        value=''
                        onChange=''
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
                        value=''
                        onChange=''
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
                        value=''
                        onChange=''
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
                        value=''
                        onChange=''
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
                        onClick=''
                        // disabled=''
                    >
                        Sign Up
                    </Button>
                </Paper>
                </Box>
            </Container>
       </>
    );
}