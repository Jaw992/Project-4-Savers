import { useAtomValue } from "jotai";
import { tokenAtom } from "../App";
import { useState, useEffect } from 'react';
import { Container, Box, TextField, Paper, Button, Typography, MenuItem, FormControl } from '@mui/material';
import { createTransaction } from '../services/apiTransactions'; 
import { allAccountsLoad } from '../services/apiAccounts'; 

export default function TransactionCard() {

    const token = useAtomValue(tokenAtom);

    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [transactionData, setTransactionData] = useState({
        account_number: '',
        transaction_type: '',
        amount: '',
        purpose: '',
    });

    useEffect(() => {
        const getAccounts = async () => {
            try {
                const response = await allAccountsLoad(token);
                setAccounts(response); 
            } catch (error) {
                console.error("Error fetching accounts:", error.message);
            }
        };
        getAccounts();
    }, [token]);

    const handleChange = (e) => {
        setTransactionData({
            ...transactionData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeAmount = (e) => {
        const { name, value } = e.target;
        setTransactionData({
            ...transactionData,
            [name]: name === 'amount' ? parseFloat(value) : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTransaction(transactionData, token);
            setSuccessMessage('Transaction successful!');

            setTransactionData({
                account_number: '',
                transaction_type: '',
                amount: '',
                purpose: '',
            });

        } catch (error) {
            console.error('Error submitting transaction:', error.message);
            setError(error.message);
        }
    };

    return (
        <Container maxWidth='sm'>
            <Box className="transactionBox" component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Paper elevation={10} sx={{ padding: 6 }}>
                    <Typography variant='h6' sx={{ fontWeight: 500 }}>Deposit / Withdrawal</Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    {successMessage && <Typography color="success.main">{successMessage}</Typography>} 
                    
                    <Box sx={{ marginBottom: 2, marginTop: 2 }}>
                        <FormControl sx={{ width: "300px", mb: 1 }}>
                            <TextField
                                select
                                label="Account Number"
                                fullWidth
                                name="account_number"
                                value={transactionData.account_number}
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
                        <FormControl sx={{ width: "300px", mb: 1 }}>
                            <TextField
                                select
                                label="Transaction Type"
                                fullWidth
                                name="transaction_type"
                                value={transactionData.transaction_type}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="deposit">Deposit</MenuItem>
                                <MenuItem value="withdrawal">Withdrawal</MenuItem>
                            </TextField>
                        </FormControl>
                    </Box>

                    {/* Purpose Field - Only show when transaction type is selected */}
                    {transactionData.transaction_type === 'deposit' && (
                        <Box sx={{ marginBottom: 2 }}>
                            <FormControl sx={{ width: "300px", mb: 1 }}>
                                <TextField
                                    select
                                    label="Purpose"
                                    fullWidth
                                    name="purpose"
                                    value={transactionData.purpose}
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="savings">Savings</MenuItem>
                                </TextField>
                            </FormControl>
                        </Box>
                    )}

                    {transactionData.transaction_type === 'withdrawal' && (
                        <Box sx={{ marginBottom: 2 }}>
                            <FormControl sx={{ width: "300px", mb: 1 }}>
                                <TextField
                                    select
                                    label="Purpose"
                                    fullWidth
                                    name="purpose"
                                    value={transactionData.purpose}
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="food">Food</MenuItem>
                                    <MenuItem value="entertainment">Entertainment</MenuItem>
                                    <MenuItem value="shopping">Shopping</MenuItem>
                                    <MenuItem value="payments">Payments</MenuItem>
                                </TextField>
                            </FormControl>
                        </Box>
                    )}

                    <Box sx={{ marginBottom: 2, width: "300px" }}>
                        <TextField
                            id="amount"
                            label="Amount"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            type="number"
                            name="amount"
                            value={transactionData.amount}
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