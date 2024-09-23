import { Box, Paper, Typography} from '@mui/material';

export default function RmDetailsCard() {

    return (
        <>
            <Box className="summaryCard" component="form" noValidate autoComplete="off">
                <Paper elevation={10} square={false} sx={{ padding: 3}}>
                    <Box>
                        <Typography variant='h5' sx={{ fontWeight: 600 }}>Relationship Manager: John Smith</Typography>
                        <Typography variant='h5' sx={{ fontWeight: 600 }}>Email: js@savers.com</Typography>
                        <Typography variant='h5' sx={{ fontWeight: 600 }}>Contact: 98203445</Typography>   
                    </Box>
                </Paper>
            </Box>
        </>
    )
}