// import { Container, Box, TextField, Paper, Button, Typography, MenuItem, FormControl } from '@mui/material';

// export default function TransactionCard() {

//     return (
//         <>
//         <Container maxWidth='sm'>
//         <Box component="form" noValidate autoComplete="off">
//             <Paper elevation={10} sx={{ padding: 6}}>    
//                 <Typography variant='h6' sx={{ fontWeight: 500 }}>Deposit / Withdrawal</Typography>
//                 <Box sx={{ marginBottom: 2, marginTop: 2 }}>
//                     <FormControl sx={{ width: "300px", mb: 1 }}>
//                         <TextField
//                             select
//                             label="Account Number"
//                             fullWidth
//                             name="accountnumber"
//                             value=''
//                             onChange=''
//                             required
//                         >
//                         <MenuItem>01-001-45</MenuItem>
//                         <MenuItem>01-001-46</MenuItem>
//                         </TextField>
//                     </FormControl>
//                 </Box>
//                 <Box sx={{ marginBottom: 2 }}>
//                     <FormControl sx={{ width: "300px", mb: 1 }}>
//                         <TextField
//                             select
//                             label="Transaction Type"
//                             fullWidth
//                             name="transactiontype"
//                             value=''
//                             onChange=''
//                             required
//                         >
//                         <MenuItem>Deposit</MenuItem>
//                         <MenuItem>Withdrawal</MenuItem>
//                         </TextField>
//                     </FormControl>
//                 </Box>
//                 <Box sx={{ marginBottom: 2 }}>
//                     <TextField
//                         id="amount"
//                         label="Amount"
//                         fullWidth
//                         margin="dense"
//                         variant="outlined"
//                         type="number"
//                         name="amount"
//                         value=''
//                         onChange=''
//                         required
//                     />
//                 </Box>
//                 <Button
//                     size='large'
//                     variant="contained"
//                     color="primary"
//                     type="submit"
//                     onClick=''
//                     // disabled=''
//                 >
//                 Submit
//                 </Button>
//                 </Paper>
//         </Box>
//         </Container>
//         </>
//     )
// }

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
    const [transactionData, setTransactionData] = useState({
        account_number: '',
        transaction_type: '',
        amount: '',
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
            await createTransaction(transactionData);
            setError('Transaction successful!');

            setTransactionData({
                account_number: '',
                transaction_type: '',
                amount: '',
            });

        } catch (error) {
            console.error('Error submitting transaction:', error.message);
            setError(error.message);
        }
    };

    return (
        <Container maxWidth='sm'>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Paper elevation={10} sx={{ padding: 6 }}>
                    <Typography variant='h6' sx={{ fontWeight: 500 }}>Deposit / Withdrawal</Typography>
                    {error && <Typography color="error">{error}</Typography>} {/* Display error message */}
                    
                    {/* Account Number Field */}
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

                    {/* Transaction Type Field */}
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

                    {/* Amount Field */}
                    <Box sx={{ marginBottom: 2 }}>
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

                    {/* Submit Button */}
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