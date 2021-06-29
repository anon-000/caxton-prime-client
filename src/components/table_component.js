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
        cursor: 'pointer'
    },
    divider: {
        // '& .MuiDivider-root': {
        //     backgroundColor: '#124954'
        // }
        backgroundColor: '#124954'
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
                                    style={{minWidth: column.minWidth, fontWeight: 'bold', fontSize: '14px'}}
                                >
                                    {column.label}
                                    {column.component ? column.component : null}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <Divider
                        className={classes.divider}
                        style={{border: '1px solid #124954', width: `${columns.length * 100}%`}}
                    />
                    <TableBody>
                        {rows.length > 0 ? (
                            rows.map((row) => {
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