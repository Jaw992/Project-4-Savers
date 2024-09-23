import { Container, Box, Paper, Typography} from '@mui/material';

export default function HistoryCard() {

    return (
        <>
            <Container maxWidth='md'>
                <Typography variant='h4' sx={{ fontWeight: 600 }}>Date</Typography>
                <Box className="historyCard" component="form" noValidate autoComplete="off" sx={{ paddingBottom: 1}}>
                    <Paper elevation={10} square={false} sx={{ padding: 3}}>
                        <Box>
                            <Typography variant='h5' sx={{ fontWeight: 600 }}>Transaction Type: Deposit</Typography>
                            <Typography variant='h6' sx={{ fontWeight: 500 }}>to 01-001-045</Typography>    
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant='h6' sx={{ fontWeight: 500 }}>SGD +$1,000</Typography>    
                        </Box>
                    </Paper>
                </Box>

                <Typography variant='h4' sx={{ fontWeight: 600 }}>Date</Typography>
                <Box className="historyCard" component="form" noValidate autoComplete="off" sx={{ paddingBottom: 1}}>
                    <Paper elevation={10} square={false} sx={{ padding: 3}}>
                        <Box>
                            <Typography variant='h5' sx={{ fontWeight: 600 }}>Transaction Type: Withdrawal</Typography>
                            <Typography variant='h6' sx={{ fontWeight: 500 }}>from 01-001-045</Typography>    
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant='h6' sx={{ fontWeight: 500 }}>SGD -$1,000</Typography>    
                        </Box>
                    </Paper>
                </Box>

                <Typography variant='h4' sx={{ fontWeight: 600 }}>Date</Typography>
                <Box className="historyCard" component="form" noValidate autoComplete="off" sx={{ paddingBottom: 1}}>
                    <Paper elevation={10} square={false} sx={{ padding: 3}}>
                        <Box>
                            <Typography variant='h5' sx={{ fontWeight: 600 }}>Transaction Type: Transfer</Typography>
                            <Typography variant='h6' sx={{ fontWeight: 500 }}>from 01-001-045 to 01-001-046</Typography>
                            <Typography variant='h6' sx={{ fontWeight: 500 }}>Purpose: Birthday Gift</Typography>    
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant='h6' sx={{ fontWeight: 500 }}>SGD -$1,000</Typography>    
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </>
    )
}