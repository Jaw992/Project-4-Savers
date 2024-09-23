import { useEffect, useState } from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';
import { allTransactions } from '../services/apiTransactions';
import { formatDate } from '../utils/formatDate'; 

export default function HistoryCard() {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await allTransactions();
                setTransactions(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchTransactions();
    }, []);

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
                transactions.map((transaction) => (
                    <Box key={transaction.id} component="form" noValidate autoComplete="off" sx={{ paddingBottom: 1 }}>
                            <Typography variant='h4' sx={{ fontWeight: 400, marginBottom: 1 }}>
                                {/* {new Date(transaction.created_at).toLocaleDateString()} */}
                                {formatDate(transaction.created_at)} 
                            </Typography>
                        <Paper elevation={10} square={false} sx={{ padding: 3 }}>
                            <Box>
                                <Typography variant='h5' sx={{ fontWeight: 600 }}>
                                    Transaction Type: {transaction.transaction_type}
                                </Typography>
                                <Typography variant='h6' sx={{ fontWeight: 500 }}>
                                    {transaction.transaction_type === 'deposit' ? 
                                        `to ${transaction.account_id}` :
                                        transaction.transaction_type === 'withdrawal' ? 
                                        `from ${transaction.account_id}` : 
                                        transaction.transaction_type === 'transfer' ? 
                                        `from ${transaction.account_id} to ${transaction.receiver_account}` : 
                                        'Unknown Transaction Type'}
                                </Typography>
                                {transaction.purpose && (
                                    <Typography variant='h6' sx={{ fontWeight: 500 }}>
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
                                    SGD {transaction.transaction_type === 'deposit' ? `+${transaction.amount}` : `-${transaction.amount}`}
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                ))
            ) : (
                <Typography variant='h6'>No transactions available.</Typography>
            )}
        </Container>
    );
}