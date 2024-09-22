import { Container, Box, TextField, Paper, Button, Typography, MenuItem, FormControl } from '@mui/material';

export default function TransactionCard() {

    return (
        <>
        <Container maxWidth='sm'>
        <Box component="form" noValidate autoComplete="off">
            <Paper elevation={10} sx={{ padding: 6}}>    
                <Typography variant='h6' sx={{ fontWeight: 500 }}>Deposit / Withdrawal</Typography>
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
                    <FormControl sx={{ width: "300px", mb: 1 }}>
                        <TextField
                            select
                            label="Transaction Type"
                            fullWidth
                            name="transactiontype"
                            value=''
                            onChange=''
                            required
                        >
                        <MenuItem>Deposit</MenuItem>
                        <MenuItem>Withdrawal</MenuItem>
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
                        id="amount"
                        label="Amount"
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        type="number"
                        name="amount"
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
                Submit
                </Button>
                </Paper>
        </Box>
        </Container>
        </>
    )
}