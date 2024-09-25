// import * as React from 'react';
import { styled } from '@mui/material/styles';
import { 
    Table, 
    TableBody, 
    TableContainer, 
    TableHead, 
    TableRow,
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

  console.log(getList)

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
                            <StyledTableCell align="center">Account Balance</StyledTableCell>
                            <StyledTableCell align="center">Account Status</StyledTableCell>
                            <StyledTableCell align="center">Relationship Manager</StyledTableCell>
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
                            <StyledTableCell align="center">$ {list.balance}</StyledTableCell>
                            <StyledTableCell align="center">{list.status}</StyledTableCell>
                            <StyledTableCell align="center">{list.rm_name}</StyledTableCell>
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