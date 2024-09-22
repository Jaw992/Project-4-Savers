import PaidIcon from '@mui/icons-material/Paid';
import Typography from '@mui/material/Typography';
import { yellow } from '@mui/material/colors';

export default function SaversBar() {
    
    return (
        <>
            <div className="savers-bar">
                <PaidIcon sx={{ color: yellow[700], fontSize: 35 }} /> 
                <Typography
                variant="h6"
                sx={{
                mr: 2,
                fontWeight: 700,
                fontSize: 30,
                color: 'inherit',
                letterSpacing: '.1rem',
                textDecoration: 'none',
                }} >
                    SAVERS
                </Typography>
            </div>
        </>
    )
}