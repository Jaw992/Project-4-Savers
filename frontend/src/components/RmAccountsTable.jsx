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
  
  function createData(id, type) {
    return { id, type};
  }
  
  const rows = [
    createData('01-001-045', 'Savings'),
    createData('01-001-046', 'Savings'),
  ];

export default function RmTableList() {
     return (
        <>
            <h1>Manage Account</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Account Number</StyledTableCell>
                            <StyledTableCell align="center">Account Type</StyledTableCell>
                            <StyledTableCell align="center">Manage</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                                {row.id}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.type}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button variant='outlined'>Close</Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
     );
}