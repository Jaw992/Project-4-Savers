import { useAtomValue } from "jotai";
import { tokenAtom } from "../App";
import { useEffect, useState } from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';
import { allTransactions } from '../services/apiTransactions';
import { formatDate } from '../utils/formatDate'; 

export default function HistoryCard() {
    const token = useAtomValue(tokenAtom);
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await allTransactions(token);
                setTransactions(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchTransactions();
    }, [token]);

    if (error) {
        return (
            <Container maxWidth='md'>
                <Typography variant='h6' color='error'>{error}</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth='md'>
            {transactions.length > 0 ? (
                transactions.map((transaction) => {
                    // Formatting amount here
                    const formattedAmount = new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD', minimumFractionDigits: 2 }).format(transaction.amount);
                    const displayAmount = transaction.transaction_type === 'deposit' ? `SGD +${formattedAmount}` : `SGD -${formattedAmount}`;

                    return (
                        <Box key={transaction.id} component="form" noValidate autoComplete="off" sx={{ paddingBottom: 1 }}>
                            <Typography variant='h5' sx={{ fontWeight: 700 }}>
                                {formatDate(transaction.created_at)} 
                            </Typography>
                            <Paper elevation={10} square={false} sx={{ padding: 3 }}>
                                <Box>
                                    <Typography variant='h5' sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                                        Transaction Type: {transaction.transaction_type}
                                    </Typography>
                                    <Typography variant='h6' sx={{ fontWeight: 500 }}>
                                        {transaction.transaction_type === 'deposit' ? 
                                            `to ${transaction.account_number}` :
                                            transaction.transaction_type === 'withdrawal' ? 
                                            `from ${transaction.account_number}` : 
                                            transaction.transaction_type === 'transfer' ? 
                                            `from ${transaction.account_number} to ${transaction.receiver_account_number}` : 
                                            'Unknown Transaction Type'}
                                    </Typography>
                                    {transaction.purpose && (
                                        <Typography variant='h6' sx={{ fontWeight: 500, textTransform: 'capitalize' }}>
                                            Purpose: {transaction.purpose}
                                        </Typography>
                                    )}
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography 
                                        variant='h6' 
                                        sx={{ fontWeight: 500, 
                                            color: transaction.transaction_type === 'deposit' ? 'green' : 
                                            transaction.transaction_type === 'withdrawal' ? 'red' : 
                                            transaction.transaction_type === 'transfer' ? 'blue' : 
                                            'black'
                                        }}
                                    >
                                        {displayAmount}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Box>
                    );
                })
            ) : (
                <Typography variant='h6'>No transactions available.</Typography>
            )}
        </Container>
    );
}