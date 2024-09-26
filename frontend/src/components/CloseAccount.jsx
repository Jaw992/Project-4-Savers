import { Container, Box, TextField, Paper, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { closeAccount, getRmTable } from '../services/apiAccounts';

export default function CloseAccount({ setGetList, token }) {
    const [formData, setFormData] = useState({ account_number: '' });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        console.log(formData.account_number);

        try {
            const response = await closeAccount(formData.account_number, token);
            setSuccessMessage(response.msg || "Account closed successfully, balance transferred.");

            setFormData({ account_number: '' });

            const updatedList = await getRmTable(token);
            setGetList(updatedList); 

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Container maxWidth='sm'>
                <Box className="transactionBox" component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Paper elevation={10} sx={{ padding: 6 }}>
                        <Typography variant='h6' sx={{ fontWeight: 500 }}>Account Closure</Typography>
                        {error && <Typography color="error">{error}</Typography>} 
                        {successMessage && <Typography color="success.main">{successMessage}</Typography>} 
                        <Box className="acc_close">
                            <TextField
                                label="Account Number"
                                margin="dense"
                                variant="outlined"
                                type="text"
                                name="account_number"
                                sx={{ width: "250px", }}
                                value={formData.account_number}
                                onChange={handleChange}
                            />
                            <Button 
                                variant='outlined' 
                                color='error' 
                                sx={{ marginLeft: 1 }}
                                type="submit"
                            >
                                Close
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </>
    )
}