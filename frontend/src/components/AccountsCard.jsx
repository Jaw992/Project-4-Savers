import { Container, Box, Paper, Typography} from '@mui/material';

export default function AccountsCard() {

    return (
        <>
            <Container maxWidth='md'>
                <Typography variant='h4' sx={{ fontWeight: 600 }}>Total Account: </Typography>
                <Box className="accountCard" component="form" noValidate autoComplete="off">
                    <Paper elevation={10} square={false} sx={{ padding: 3}}>
                        <Box>
                            <Typography variant='h5' sx={{ fontWeight: 600 }}>Savings Account</Typography>
                            <Typography variant='h6' sx={{ fontWeight: 500 }}>01-001-045</Typography>    
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant='h5' sx={{ fontWeight: 600 }}>Balance:</Typography>
                            <Typography variant='h6' sx={{ fontWeight: 500 }}>$ 10,000</Typography>    
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </>
    )
}