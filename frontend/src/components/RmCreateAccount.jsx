import { useState, useEffect } from 'react';
import { Container, Box, TextField, Paper, Button, Typography, MenuItem, FormControl } from '@mui/material';
import { createAccount, getRmTable } from '../services/apiAccounts';
import { allClientLoad } from '../services/apiUsers'; 

export default function RmCreateAccount({ setGetList, token }) {

    const [formData, setFormData] = useState({
        balance: 0,
        account_type: '',
        name: '',
    });

    const [client, setClient] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const clientsData = await allClientLoad(token);
                setClient(clientsData);
            } catch (err) {
                console.error('Error fetching users:', err);
                setError('Unable to fetch clients. Please try again later.');
            }
        };

        fetchUsers();
    }, [token]);

    // Handle input change for all form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeAmount = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'balance' ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createAccount(formData, token);
            setSuccessMessage('Account created successfully');

            setFormData({
                balance: 0,
                account_type: '',
                name: '',
            });

            const updatedList = await getRmTable(token);
            setGetList(updatedList); 

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container maxWidth='sm'>
            <Box className="transactionBox" component="form" noValidate autoComplete="off" sx={{ paddingTop: 3 }} onSubmit={handleSubmit}>
                <Paper elevation={10} sx={{ padding: 6 }}>
                    <Typography variant='h6' sx={{ fontWeight: 500 }}>Create Account</Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    {successMessage && <Typography color="success.main">{successMessage}</Typography>} 

                    <Box sx={{ marginBottom: 2, marginTop: 2 }}>
                        <FormControl sx={{ width: "300px", mb: 1 }}>
                            <TextField
                                select
                                label="Client"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            >
                                {client.map((clients) => (
                                    <MenuItem key={clients.id} value={clients.name}>
                                        {clients.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Box>

                    <Box sx={{ marginBottom: 2 }}>
                        <FormControl sx={{ width: "300px", mb: 1 }}>
                            <TextField
                                select
                                label="Account Type"
                                name="account_type"
                                value={formData.account_type}
                                onChange={handleInputChange}
                                required
                            >
                                <MenuItem value="savings">Savings</MenuItem>
                                <MenuItem value="student">Student</MenuItem>
                            </TextField>
                        </FormControl>
                    </Box>

                    <Box sx={{ marginBottom: 2, width: "300px" }}>
                        <TextField
                            label="Amount"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            type="number"
                            name="balance"
                            value={formData.balance}
                            onChange={handleChangeAmount}
                            required
                        />
                    </Box>

                    <Button
                        size='large'
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Create
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
}