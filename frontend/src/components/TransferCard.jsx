import { useAtomValue } from "jotai";
import { tokenAtom } from "../App";
import { useState, useEffect } from 'react';
import { Container, Box, TextField, Paper, Button, Typography, MenuItem, FormControl } from '@mui/material';
import { createTransfer } from '../services/apiTransactions';  
import { allAccountsLoad } from '../services/apiAccounts';  

export default function TransferCard() {

    const token = useAtomValue(tokenAtom);
    
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [transferData, setTransferData] = useState({
        transaction_type: 'transfer',
        sender_account_number: '',
        receiver_account_number: '',
        purpose: '',
        amount: '',
    });

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await allAccountsLoad(token);
                setAccounts(response);
            } catch (error) {
                console.error('Error fetching accounts:', error.message);
            }
        };
        fetchAccounts();
    }, [token]);

    const handleChange = (e) => {
        setTransferData({
            ...transferData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeAmount = (e) => {
        const { name, value } = e.target;
        setTransferData({
            ...transferData,
            [name]: name === 'amount' ? parseFloat(value) : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTransfer(transferData, token);  
            setSuccessMessage('Transfer successful!');

            setTransferData({
                transaction_type: 'transfer',
                sender_account_number: '',
                receiver_account_number: '',
                purpose: '',
                amount: '',
            });
            
        } catch (error) {
            console.error('Error processing transfer:', error.message);
            setError(error.message);
        }
    };

    return (
        <Container maxWidth='sm'>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Paper elevation={10} sx={{ padding: 6 }}>
                    <Typography variant='h6' sx={{ fontWeight: 500 }}>Transfers</Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    {successMessage && <Typography color="success.main">{successMessage}</Typography>} 
                    <Box sx={{ marginBottom: 2, marginTop: 2 }}>
                        <FormControl sx={{ width: "300px", mb: 1 }}>
                            <TextField
                                select
                                label="From Account"
                                fullWidth
                                name="sender_account_number"
                                value={transferData.sender_account_number}
                                onChange={handleChange}
                                required
                            >
                                {accounts.map((account) => (
                                    <MenuItem key={account.id} value={account.account_number}>
                                        {account.account_number}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                id="toAccount"
                                label="To Account"
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                type="text"
                                name="receiver_account_number"
                                value={transferData.receiver_account_number}
                                onChange={handleChange}
                                required
                            >
                            </TextField>
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <FormControl sx={{ width: "300px", mb: 1 }}>
                            <TextField
                                select
                                label="Purpose"
                                fullWidth
                                name="purpose"
                                value={transferData.purpose}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="internal">Internal</MenuItem>
                                <MenuItem value="external">External</MenuItem>
                            </TextField>
                        </FormControl>
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            id="amount"
                            label="Amount"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            type="number"
                            name="amount"
                            value={transferData.amount}
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
                        Submit
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
}