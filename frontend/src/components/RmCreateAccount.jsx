import { Container, Box, TextField, Paper, Button, Typography, MenuItem, FormControl } from '@mui/material';

export default function RmCreateAccount() {

    return (
        <>
        <Container maxWidth='sm'>
        <Box component="form" noValidate autoComplete="off" sx={{ paddingTop: 10 }}>
            <Paper elevation={10} sx={{ padding: 6}}>    
                <Typography variant='h6' sx={{ fontWeight: 500 }}>Create Account</Typography>
                <Box sx={{ marginBottom: 2, marginTop: 2 }}>
                    <FormControl sx={{ width: "300px", mb: 1 }}>
                        <TextField
                            select
                            label="Account Type"
                            fullWidth
                            name="accounttype"
                            value=''
                            onChange=''
                            required
                        >
                        <MenuItem>Savings</MenuItem>
                        <MenuItem>Student</MenuItem>
                        {/* {accounts.map((account) => (
                        <MenuItem key={account._id} value={account._id}>
                            {account._id}
                        </MenuItem>
                        ))} */}
                        </TextField>
                    </FormControl>
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        id="generate"
                        label="Account Number"
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        type="text"
                        name="accountid"
                        value=''
                        onChange=''
                        required
                    />
                </Box>
                <Button
                    size='large'
                    variant="contained"
                    color="primary"
                    type="submit"
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