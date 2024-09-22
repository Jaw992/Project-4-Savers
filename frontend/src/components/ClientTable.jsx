// import * as React from 'react';
import { styled } from '@mui/material/styles';
import { 
    Table, 
    TableBody, 
    TableContainer, 
    TableHead, 
    TableRow,
    Button, 
    Paper } 
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
  
  function createData(client, accounts, rm) {
    return { client, accounts, rm };
  }
  
  const rows = [
    createData('Alex Wong', 2, 'John Smith'),
    createData('Sam Lee', 0, 'John Smith'),
  ];

export default function ClientTable() {
     return (
        <div className="rmPages">
            <h1>All Client List</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Client</StyledTableCell>
                            <StyledTableCell align="center">Accounts Opened</StyledTableCell>
                            <StyledTableCell align="center">Relationship Manager</StyledTableCell>
                            <StyledTableCell align="center">Assign</StyledTableCell>
                            <StyledTableCell align="center">Manage Account</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.client}>
                            <StyledTableCell component="th" scope="row">
                                {row.client}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.accounts}</StyledTableCell>
                            <StyledTableCell align="center">{row.rm}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button variant='outlined'>Assign</Button>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Button href="/rm-manage-accounts">Create/Delete</Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
     );
}