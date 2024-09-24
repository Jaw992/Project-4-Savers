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
    Paper,
    TextField } 
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
  
  function createData(client, accounts, type, rm) {
    return { client, accounts, type, rm };
  }
  
  const rows = [
    createData('Alex Wong', '01-001-045', 'Savings','John Smith'),
    createData('Sam Lee', '01-001-046', 'Savings', 'John Smith'),
  ];

export default function RmTableList() {
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
                    {rows.map((row) => (
                        <StyledTableRow key={row.client}>
                            <StyledTableCell component="th" scope="row">
                                {row.client}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.accounts}</StyledTableCell>
                            <StyledTableCell align="center">{row.type}</StyledTableCell>
                            <StyledTableCell align="center">{row.rm}</StyledTableCell>
                            <StyledTableCell align="center">
                              <Box className="acc_close">
                                <TextField
                                id="close"
                                label="Input"
                                margin="dense"
                                variant="outlined"
                                type="text"
                                name="account_number"
                                value=''
                                onChange=''
                                required
                                />
                              <Button variant='outlined' color='error' sx={{ marginLeft: 1}}>Close</Button>
                              </Box>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </>
     );
}