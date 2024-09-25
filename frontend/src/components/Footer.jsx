import { Box, Link } from '@mui/material';

export default function Footer () {
    return (
        <>
             <footer className="bg-footer">
                <Box
                sx={{
                    typography: 'body1',
                    '& > :not(style) ~ :not(style)': {
                    ml: 2,
                    },
                }}
                >
                    <Link href="/rm-login" underline="hover" color="inherit">
                        {'Welcome to Savers:'}
                    </Link>
                    <Link href="#" underline="always" color="inherit">
                        {'Terms & Conditions'}
                    </Link>
                    <Link href="#!" underline="always" color="inherit">
                        {'Contact Us'}
                    </Link>
                </Box>
            </footer>
        </>
    )
}