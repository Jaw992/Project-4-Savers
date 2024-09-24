// import { useState, useEffect } from "react";
// import { useAtomValue } from "jotai";
// import { tokenAtom } from "../App";
// import { clientLoad } from "../services/apiUsers"; 
import { Box, Paper, Typography } from '@mui/material';

export default function ClientDetailsCard({ client }) {
  // const token = useAtomValue(tokenAtom);
  
  // // State to store client data, loading state, and error
  // const [client, setClient] = useState([]);
  // const [error, setError] = useState(null);

  // console.log(error);

  // useEffect(() => {
  //   async function fetchClient() {
  //     try {
  //       const clientData = await clientLoad(token); 
  //       setClient(clientData[0]); 
  //     } catch (err) {
  //       setError(err.message); 
  //     }
  //   }

  //   fetchClient();
  // }, [token]); 

  return (
    <Box className="summaryCard" component="form" noValidate autoComplete="off">
      <Paper elevation={10} square={false} sx={{ padding: 3 }}>
        <Box>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>Name: {client?.name || "N/A"}</Typography>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>Email: {client?.email || "N/A"}</Typography>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>Contact: {client?.contact || "N/A"}</Typography>
        </Box>
      </Paper>
    </Box>
  );
}