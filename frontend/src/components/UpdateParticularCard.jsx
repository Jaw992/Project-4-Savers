import { useAtomValue } from "jotai";
import { tokenAtom } from "../App";

import { Container, Box, TextField, Paper, Button, Typography } from '@mui/material';

export default function UpdateParticularCard() {

    const token = useAtomValue(tokenAtom);

    return (
        <>
            <Container maxWidth='sm'>
            <Box component="form" noValidate autoComplete="off">
                <Paper elevation={10} sx={{ padding: 6}}>    
                    <Typography variant='h6' sx={{ fontWeight: 500 }}>Update Particulars</Typography>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            id="name"
                            label="Name"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            type="text"
                            name="name"
                            value=''
                            onChange=''
                            required
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            id="email"
                            label="Email"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            type="email"
                            name="email"
                            value=''
                            onChange=''
                            required
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            id="contact"
                            label="Contact Number"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            type="number"
                            name="contact"
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
                    Update
                    </Button>
                    </Paper>
            </Box>
            </Container>
        </>
    )
}