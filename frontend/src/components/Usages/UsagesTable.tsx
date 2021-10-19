import React from "react";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


const UsagesTable = (props: any) => {
    return (
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Unit</TableCell>
                    <TableCell align="right">Factor</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {(props.usages.length > 0
                    ? props.usages.map((usage: any) => (
                        <TableRow key={usage.id}>
                            <TableCell component="th" scope="row">
                                <b>{usage.id}</b>
                            </TableCell>
                            <TableCell>{usage.usage_at}</TableCell>
                            <TableCell>{usage.user.first_name} {usage.user.last_name}</TableCell>
                            <TableCell>{usage.usage_type.name}</TableCell>
                            <TableCell>{usage.usage_type.unit}</TableCell>
                            <TableCell align="right">{usage.usage_type.factor}</TableCell>
                            <TableCell align="right">{Math.round(usage.amount / usage.usage_type.factor * 1000) / 1000}</TableCell>
                            <TableCell align="right">{usage.amount}</TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => props.handleDeleteUsage(usage.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))
                    : (null))}
            </TableBody>

            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={9}
                        count={props.count}
                        rowsPerPage={props.rowsPerPage}
                        page={props.page}
                        SelectProps={{
                            inputProps: {
                                'aria-label': 'rows per page',
                            },
                            native: true,
                        }}
                        onPageChange={props.handleChangePage}
                        onRowsPerPageChange={props.handleChangeRowsPerPage}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export default UsagesTable;