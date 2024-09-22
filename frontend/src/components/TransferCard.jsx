import { Container, Box, TextField, Paper, Button, Typography, MenuItem, FormControl } from '@mui/material';

export default function TransferCard() {

    return (
        <>
        <Container maxWidth='sm'>
        <Box component="form" noValidate autoComplete="off">
            <Paper elevation={10} sx={{ padding: 6}}>    
                <Typography variant='h6' sx={{ fontWeight: 500 }}>Transfers</Typography>
                <Box sx={{ marginBottom: 2, marginTop: 2 }}>
                    <FormControl sx={{ width: "300px", mb: 1 }}>
                        <TextField
                            select
                            label="From"
                            fullWidth
                            name="fromAccount"
                            value=''
                            onChange=''
                            required
                        >
                        <MenuItem>01-001-045</MenuItem>
                        <MenuItem>01-001-046</MenuItem>
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
                            label="To"
                            fullWidth
                            name="toAccount"
                            value=''
                            onChange=''
                            required
                        >
                        <MenuItem>01-001-045</MenuItem>
                        <MenuItem>01-001-046</MenuItem>
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
                        id="purpose"
                        label="Purpose"
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        type="text"
                        name="purpose"
                        value=''
                        onChange=''
                        required
                    />
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