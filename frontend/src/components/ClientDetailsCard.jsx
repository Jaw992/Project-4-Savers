import { Box, Paper, Typography} from '@mui/material';

export default function ClientDetailsCard() {

    return (
        <>
            <Box className="summaryCard" component="form" noValidate autoComplete="off">
                <Paper elevation={10} square={false} sx={{ padding: 3}}>
                    <Box>
                        <Typography variant='h5' sx={{ fontWeight: 600 }}>Name: Client</Typography>
                        <Typography variant='h5' sx={{ fontWeight: 600 }}>Email: client@gmail.com</Typography>
                        <Typography variant='h5' sx={{ fontWeight: 600 }}>Contact: 97304752</Typography>       
                    </Box>
                </Paper>
            </Box>
        </>
    )
}