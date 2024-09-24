import { useAtomValue } from "jotai";
import { tokenAtom } from "../App";

import { Container, Box, TextField, Paper, Button, Typography, MenuItem, FormControl } from '@mui/material';

export default function RmCreateAccount() {

    const token = useAtomValue(tokenAtom);

    return (
        <>
        <Container maxWidth='sm'>
        <Box component="form" noValidate autoComplete="off" sx={{ paddingTop: 3 }}>
            <Paper elevation={10} sx={{ padding: 6}}>    
                <Typography variant='h6' sx={{ fontWeight: 500 }}>Create Account</Typography>
                <Box sx={{ marginBottom: 2, marginTop: 2 }}>
                    <FormControl sx={{ width: "455px", mb: 1 }}>
                        <TextField
                            select
                            label="Client"
                            name="client"
                            value=''
                            onChange=''
                            required
                        >
                        <MenuItem>Alex Wong</MenuItem>
                        <MenuItem>Sam Lee</MenuItem>
                        </TextField>
                    </FormControl>
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <FormControl sx={{ width: "455px", mb: 1 }}>
                        <TextField
                            select
                            label="Account Type"
                            name="accounttype"
                            value=''
                            onChange=''
                            required
                        >
                        <MenuItem>Savings</MenuItem>
                        <MenuItem>Student</MenuItem>
                        </TextField>
                    </FormControl>
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        id="generate"
                        label="Account Number"
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        type="text"
                        name="accountid"
                        value=''
                        onChange=''
                        required
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        id="balance"
                        label="Amount"
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        type="number"
                        name="balance"
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
                Create
                </Button>
                </Paper>
        </Box>
        </Container>
        </>
    );
}