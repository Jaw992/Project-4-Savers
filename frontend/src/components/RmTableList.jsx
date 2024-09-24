// import { useAtomValue } from "jotai";
// import { tokenAtom } from "../App";
// import { useState, useEffect } from 'react';
// import { getRmTable } from "../services/apiAccounts";

// import * as React from 'react';
import { styled } from '@mui/material/styles';
import { 
    Table, 
    TableBody, 
    TableContainer, 
    TableHead, 
    TableRow,
    Box,
    Button, 
    Paper,} 
from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export default function RmTableList({ getList }) {

  // const token = useAtomValue(tokenAtom);

//   const [getList, setGetList] = useState([]);
//   const [error, setError] = useState(null);

//   console.log(error);

//   useEffect(() => {
//     const fetchTableData = async () => {
//         try {
//             const data = await getRmTable(token);  
//             setGetList(data);  
//         } catch (err) {
//             console.error('Error fetching RM table data:', err.message);
//             setError('Failed to fetch data. Please try again later.');
//         }
//     };

//     fetchTableData();
// }, [token]);

     return (
        <>
            <h1>All Client List</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Client</StyledTableCell>
                            <StyledTableCell align="center">Account Number</StyledTableCell>
                            <StyledTableCell align="center">Account Type</StyledTableCell>
                            <StyledTableCell align="center">Relationship Manager</StyledTableCell>
                            <StyledTableCell align="center">Account Closure</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {getList.length > 0 ? (
                        getList.map((list) => (
                        <StyledTableRow key={list.account_id}>
                            <StyledTableCell component="th" scope="row">
                                {list.client_name}
                            </StyledTableCell>
                            <StyledTableCell align="center">{list.account_number}</StyledTableCell>
                            <StyledTableCell align="center">{list.account_type}</StyledTableCell>
                            <StyledTableCell align="center">{list.rm_name}</StyledTableCell>
                            <StyledTableCell align="center">
                              <Box className="acc_close">
                              <Button variant='outlined' color='error' sx={{ marginLeft: 1}}>Close</Button>
                              </Box>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))
                  ) : (
                    <StyledTableRow>
                        <StyledTableCell colSpan={5} align="center">No data available</StyledTableCell>
                    </StyledTableRow>
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
            </>
     );
}