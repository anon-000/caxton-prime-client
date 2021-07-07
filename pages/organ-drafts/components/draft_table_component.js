import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import TableSkeleton from "../../../src/components/skeleton/Table_skeleton";
import PropTypes from "prop-types";
import React, {useState} from "react";
import more from '../../../src/asset/Menu.svg';
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description draft_table_component.js
 * @createdOn 04/07/21 9:38 pm
 */



const useStyles = makeStyles({
    tableCell: {
        fontWeight: '700',
        fontSize: '14px',
        color: '#3A8899',
        cursor: 'pointer',
        padding: '18px 20px',
        border: '0px solid',
    },
    difficultyCell: {
        fontWeight: '700',
        fontSize: '12px',
        color: '#ffffff',
        cursor: 'pointer',
        padding: '14px 12px',
        border: '0px solid',
    },
    clickable: {
        cursor: "pointer",
        userSelect: "none",
    },
    elevation: {
        boxShadow: "2px 2px 6px rgba(18, 73, 84, 0.15)"
    },
    divider: {
        // '& .MuiDivider-root': {
        //     backgroundColor: '#124954'
        // }
        // backgroundColor: '#124954'
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

const DraftTableComponent = ({columns, rows, notFound, loading, pageLimit, setRow, moreTap}) => {

    const classes = useStyles();

    const [currentId, setCurrentId] = useState();


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setCurrentId(id);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


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
                    <TableBody>
                        {rows.length > 0 ? (
                            rows.map((row, rIndex) => {
                                const tempId = row["_id"];
                                return (
                                    <TableRow
                                        hover
                                        role="button"
                                        tabIndex={-1}
                                        key={row.code}
                                        style={{
                                            backgroundColor: rIndex % 2 === 0 ? '#FAF7F7' : '#ffffff',
                                            border: '0px solid',
                                            '&:hover': {backgroundColor: "#F03D5F"}
                                        }}
                                        onClick={() => {
                                            setRow(row);
                                        }}
                                    >
                                        {columns.map((column) => {
                                            let value = row[column.id];
                                            return (
                                                column.id === "difficulty" ? <Box
                                                    className={classes.difficultyCell}
                                                    display={'flex'} flexDirection={'column'} justifyContent={'center'}
                                                    alignItems={'center'}
                                                >
                                                    <Box display={'flex'}
                                                         py={0.6} borderRadius={16} px={2}
                                                         bgcolor={value === 1 ? "#0EA81D" : value === 2 ? "#F6A121" : "#A8140E"}>
                                                        {value === 1 ? "Easy" : value === 2 ? "Medium" : "Difficult"}
                                                    </Box>
                                                </Box> : column.id === 'more' ?
                                                    <Box>
                                                        <Box className={classes.clickable}
                                                             onClick={(e) => handleClick(e, tempId)}
                                                             py={3} display={'flex'}
                                                             flexDirection={'column'} justifyContent={'center'}
                                                             alignItems={'center'}>
                                                            <img src={more} alt={'more'}/>
                                                        </Box>
                                                        <Popover
                                                            id={id}
                                                            open={open}
                                                            anchorEl={anchorEl}
                                                            onClose={handleClose}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'center',
                                                            }}
                                                            elevation={1}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <Box
                                                                width={'100%'}
                                                                p={1}
                                                                display={'flex'}
                                                                flexDirection={'column'}
                                                            >
                                                                {
                                                                    [1, 2, 3, 4].map((e) => <Button
                                                                        onClick={() => moreTap(e, currentId)}
                                                                        color={"primary"}
                                                                    >
                                                                        {e === 1 ? "Edit" : e === 2 ? "Delete" : e === 3 ? "Schedule" : "Practice set"}
                                                                    </Button>)
                                                                }
                                                            </Box>
                                                        </Popover>
                                                    </Box> : column.id === 'delete' ?
                                                        <Box className={classes.root} width={'100%'}>
                                                            <IconButton
                                                                onClick={() => moreTap(1, tempId)}>
                                                                <DeleteOutlineIcon fontSize="default"/>
                                                            </IconButton>
                                                        </Box> :
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

DraftTableComponent.propTypes = {
    columns: PropTypes.array,
    rows: PropTypes.array,
    notFound: PropTypes.string,
    loading: PropTypes.bool,
    pageLimit: PropTypes.number,
    setRow: PropTypes.func,
};

export default DraftTableComponent;