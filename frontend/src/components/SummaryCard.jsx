import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { tokenAtom } from '../App';
import { transactionSummary } from '../services/apiTransactions'; 
import { Container, Box, Paper, Typography } from '@mui/material';

export default function SummaryCard() {

    const token = useAtomValue(tokenAtom);
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const data = await transactionSummary(token);
                setSummary(data[0]); 
            } catch (error) {
                setError(error.message); 
            }
        };

        fetchSummary();
    }, [token]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container maxWidth='sm' sx={{ marginBottom: 5 }}>
            <Typography variant='h5' sx={{ fontWeight: 600 }}>Summary Card</Typography>
            <Box className="summaryCard" component="form" noValidate autoComplete="off">
                <Paper elevation={10} square={false} sx={{ padding: 3 }}>
                    <Box>
                        {summary ? (
                            <>
                                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                                    Total Savings: ${summary.total_deposit_savings || 0}
                                </Typography>
                                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                                    Total Internal Transfers: ${summary.total_transfer_internal || 0}
                                </Typography>
                                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                                    Total External Transfers: ${summary.total_transfer_external || 0}
                                </Typography>
                                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                                    Total Spending - Food: ${summary.total_withdrawal_food || 0}
                                </Typography>
                                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                                    Total Spending - Entertainment: ${summary.total_withdrawal_entertainment || 0}
                                </Typography>
                                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                                    Total Spending - Shopping: ${summary.total_withdrawal_shopping || 0}
                                </Typography>
                                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                                    Total Spending - Payments: ${summary.total_withdrawal_payments || 0}
                                </Typography>
                            </>
                        ) : (
                            <Typography variant='h5' sx={{ fontWeight: 600 }}>Loading...</Typography>
                        )}
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}