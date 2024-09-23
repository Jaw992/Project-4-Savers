import { Container, Box, Paper, Typography} from '@mui/material';

export default function SummaryCard() {

    return (
        <>
            <Container maxWidth='sm' sx={{ marginBottom: 5 }}>
                <Typography variant='h4' sx={{ fontWeight: 600 }}>Summary Card</Typography>
                <Box className="summaryCard" component="form" noValidate autoComplete="off">
                    <Paper elevation={10} square={false} sx={{ padding: 3}}>
                        <Box>
                            <Typography variant='h5' sx={{ fontWeight: 600 }}>Total Spendings: $600</Typography>
                            <Typography variant='h5' sx={{ fontWeight: 600 }}>Total Savings: $1,000</Typography>    
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </>
    )
}