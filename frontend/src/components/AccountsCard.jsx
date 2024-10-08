import { useAtomValue } from "jotai";
import { tokenAtom } from "../App";
import { useState, useEffect } from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';
import { allAccountsLoad, sumLoad } from '../services/apiAccounts';

export default function AccountsCard() {

    const token = useAtomValue(tokenAtom);

    const [accounts, setAccounts] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await allAccountsLoad(token);
                const getSum = await sumLoad(token);
                setAccounts(response);
                setTotalBalance(getSum.total_balance);
            } catch (error) {
                console.error('Error fetching accounts:', error.message);
            }
        };
        fetchAccounts();
    }, [token]);

    return (
        <Container maxWidth='md'>
            <Typography variant='h4' sx={{ fontWeight: 600 }}>
                Total Balance: $ {totalBalance}
            </Typography>

            <Box className="accountCard" component="div" noValidate autoComplete="off">
                {accounts.map((account) => (
                    <Paper
                        key={account.id}
                        elevation={10}
                        square={false}
                        sx={{ padding: 3, marginBottom: 2 }}
                    >
                        <Box>
                            <Typography variant='h5' sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                                {account.account_type} Account
                            </Typography>
                            <Typography variant='h6' sx={{ fontWeight: 500 }}>
                                {account.account_number}
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant='h5' sx={{ fontWeight: 600 }}>
                                Balance:
                            </Typography>
                            <Typography variant='h6' sx={{ fontWeight: 500 }}>
                            SGD {new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD', minimumFractionDigits: 2 }).format(account.balance)}
                            </Typography>
                        </Box>
                    </Paper>
                ))}
            </Box>
        </Container>
    );
}