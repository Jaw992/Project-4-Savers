import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

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
                        {'Welcome to Savers'}
                    </Link>
                    <Link href="#!" underline="always" color="inherit">
                        {'Contact Us'}
                    </Link>
                </Box>
            </footer>

            {/*Test Routes */}
            <div className="bg-light py-3">
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    typography: 'body1',
                    '& > :not(style) ~ :not(style)': {
                    ml: 2,
                    },
                }}
                >
                    <Link href="/sign-up" underline="always">
                        {'SignUp Page'}
                    </Link>
                    <Link href="/rm-main" underline="always">
                        {'Rm Main Page'}
                    </Link>
                    <Link href="/rm-manage-accounts" underline="always">
                        {'Manage Accounts Page'}
                    </Link>
                    <Link href="/client-main" underline="always">
                        {'Client Main Page'}
                    </Link>
                    <Link href="/client-profile" underline="always">
                        {'Client Profile Page'}
                    </Link>
                    <Link href="/client-history" underline="always">
                        {'Client History Page'}
                    </Link>
                    <Link href="/client-transactions" underline="always">
                        {'Client Transactions Page'}
                    </Link>
                    <Link href="/client-transfers" underline="always">
                        {'Client Transfers Page'}
                    </Link>
                </Box>
            </div>
        </>
    )
}