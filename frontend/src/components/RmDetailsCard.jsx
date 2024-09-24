// import { useAtomValue } from "jotai";
// import { tokenAtom } from "../App";

// import { Box, Paper, Typography} from '@mui/material';

// export default function RmDetailsCard() {

//     const token = useAtomValue(tokenAtom);

//     return (
//         <>
//             <Box className="summaryCard" component="form" noValidate autoComplete="off">
//                 <Paper elevation={10} square={false} sx={{ padding: 3}}>
//                     <Box>
//                         <Typography variant='h5' sx={{ fontWeight: 600 }}>Relationship Manager: John Smith</Typography>
//                         <Typography variant='h5' sx={{ fontWeight: 600 }}>Email: js@savers.com</Typography>
//                         <Typography variant='h5' sx={{ fontWeight: 600 }}>Contact: 98203445</Typography>   
//                     </Box>
//                 </Paper>
//             </Box>
//         </>
//     )
// }

import { useAtomValue } from "jotai";
import { tokenAtom } from "../App";
import { useEffect, useState } from "react";
import { rmLoad } from "../services/apiUsers"; 

import { Box, Paper, Typography } from '@mui/material';

export default function RmDetailsCard() {
    
    const token = useAtomValue(tokenAtom);
    const [managerDetails, setManagerDetails] = useState(null);
    const [error, setError] = useState(null);

    console.log(error);

    useEffect(() => {
        const fetchManagerDetails = async () => {
            try {
                const details = await rmLoad(token);
                setManagerDetails(details[0]);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchManagerDetails();
    }, [token]);

    return (
        <Box className="summaryCard" component="form" noValidate autoComplete="off">
            <Paper elevation={10} square={false} sx={{ padding: 3 }}>
                <Box>
                    <Typography variant='h5' sx={{ fontWeight: 600 }}>
                        Relationship Manager: {managerDetails?.name || "N/A"}
                    </Typography>
                    <Typography variant='h5' sx={{ fontWeight: 600 }}>
                        Email: {managerDetails?.email || "N/A"}
                    </Typography>
                    <Typography variant='h5' sx={{ fontWeight: 600 }}>
                        Contact: {managerDetails?.contact || "N/A"}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}