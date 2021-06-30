/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description table_component.js
 * @createdOn 29/06/21 3:00 pm
 */


import {
    Divider,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import TableSkeleton from './skeleton/Table_skeleton';
import React from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    tableCell: {
        fontWeight: '700',
        fontSize: '14px',
        color: '#3A8899',
        cursor: 'pointer',
        padding: '18px 20px',
        '&:hover': {backgroundColor: "#F03D5F"}
    },
    divider: {
        // '& .MuiDivider-root': {
        //     backgroundColor: '#124954'
        // }
        // backgroundColor: '#124954'
    }
});

const TableComponent = ({columns, rows, notFound, loading, pageLimit, setRow}) => {

    const classes = useStyles();

    return (
        <div>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        fontWeight: '700',
                                        fontSize: '14px',
                                        backgroundColor: '#F03D5F',
                                        color: '#ffffff',
                                        padding: '20px 20px'
                                    }}
                                >
                                    {column.label}
                                    {column.component ? column.component : null}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {/*<Divider*/}
                    {/*    className={classes.divider}*/}
                    {/*    style={{border: '1px solid #124954', width: `500%`}}*/}
                    {/*/>*/}
                    <TableBody>
                        {rows.length > 0 ? (
                            rows.map((row, rIndex) => {
                                return (
                                    <TableRow
                                        hover
                                        role="button"
                                        tabIndex={-1}
                                        key={row.code}
                                        onClick={() => {
                                            setRow(row);
                                        }}
                                    >
                                        {columns.map((column) => {
                                            let value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    className={classes.tableCell}
                                                    style={{
                                                        backgroundColor: rIndex % 2 === 0 ? '#FAF7F7' : '#ffffff',
                                                        border: '0px solid',
                                                    }}
                                                >
                                                    {
                                                        column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })
                        ) : !loading ? (
                            <TableRow>
                                <TableCell align="center" colSpan={columns.length}>
                                    <Typography>
                                        {notFound}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            <TableRow>
                                <TableCell align="center" colSpan={columns.length}>
                                    <TableSkeleton length={pageLimit}/>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

TableComponent.propTypes = {
    columns: PropTypes.array,
    rows: PropTypes.array,
    notFound: PropTypes.string,
    loading: PropTypes.bool,
    pageLimit: PropTypes.number,
    setRow: PropTypes.func,
};

export default TableComponent;