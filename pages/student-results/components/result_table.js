import React, {useEffect, useState} from 'react';
import {Box, makeStyles} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import {useSnackbar} from 'notistack';
import CardBody from '../../../src/components/cards/card_body';
import Card from '../../../src/components/cards/Card';
import ExamTableComponent from "./result_table_component";
import {getAllResults} from "../../../src/apis/results";
import moment from "moment/moment";


/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description exams_table.js
 * @createdOn 29/06/21 5:53 pm
 */


const useStyles = makeStyles((theme) => ({
    withHover: {
        cursor: 'pointer',
        userSelect: 'none',
        border: '1px solid',
        '&:hover': {
            backgroundColor: "#F03D5F",
            color: '#ffffff',
            border: '1px solid', borderColor: '#F03D5F',
            fontWeight: '600'
        }
    },
    skeleton: {
        cursor: 'pointer',
        userSelect: 'none',
        backgroundColor: '#FAF7F7'
    }
}));
const columns = [
    {
        id: 'code',
        label: 'Result Id',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'title',
        label: 'Name',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'formattedDate',
        label: 'Scheduled At',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'difficulty',
        label: 'Difficulty',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'totalMarks',
        label: 'Total Marks',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'securedMarks',
        label: 'Marks secured',
        minWidth: 170,
        align: 'center',
    },

];

const ResultsTable = ({search}) => {

        const [page, setPage] = React.useState(1);
        const [totalPages, setTotalPages] = React.useState(20);
        const [rowsPerPage] = React.useState(12);
        const [results, setResults] = React.useState([]);
        const [total, setTotal] = React.useState(0);
        const [rows, setRows] = React.useState([]);
        const [loading, setLoading] = React.useState(false);
        const [clickedRow, setClickedRow] = React.useState(null);
        // const classes = useStyles();

        const [data, setData] = useState([]);
        // const Router = useRouter();
        const {enqueueSnackbar} = useSnackbar();

        // const headerStyles = makeStyles(styles);
        // const headerClasses = headerStyles();

        const setRow = (req) => {
            const index = data.findIndex(e => e._id.toString() === req._id.toString());
            setClickedRow(data[index]);
            // Router.push(`/exam-details/${data[index]._id}`);
        };

        const loadResults = (skip) => {
            setLoading(true);
            getAllResults(skip, rowsPerPage, search)
                .then((res) => {
                    if (res.data) {
                        let _allResults = res.data.map(each => {
                            return {
                                code: each._id.slice(each._id.length - 6, each._id.length).toUpperCase(),
                                title: each.exam.title,
                                formattedDate: moment(each.exam.scheduledAt).format("HH:mm A, DD-MM-YYYY"),
                                questionCount: each.exam.questionCount,
                                difficulty: each.exam.difficulty,
                                ...each,
                            };
                        });
                        setRows(_allResults);
                        setResults([...results, _allResults]);
                        setData([...data, ..._allResults]);
                    }
                })
                .catch((e) => {
                    enqueueSnackbar(e && e.message ? e.message : 'Something went wrong!', {variant: 'warning'});
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        const handleChangePage = (event, value) => {
            setPage(value);
            if (value * rowsPerPage > results.length) {
                setRows([]);
                if (results.length === total) {
                    setRows(results.slice((value - 1) * rowsPerPage, total));
                } else {
                    loadResults((value - 1) * rowsPerPage);
                }
            } else {
                setRows([]);
                setRows(results.slice((value - 1) * rowsPerPage, value * rowsPerPage));
            }
        };


        useEffect(() => {
            setResults([]);
            setRows([]);
            setData([]);
            loadData();
        }, [search]);


        const loadData = () => {
            console.log("use effect result table");
            setLoading(true);
            getAllResults(0, rowsPerPage, search)
                .then((res) => {
                    console.log("api response : ",res);
                    setTotal(res.total);
                    let _allResults = res.data.map(each => {
                        return {
                            code: each.exam._id.slice(each.exam._id.length - 6, each.exam._id.length).toUpperCase(),
                            title: each.exam.title,
                            formattedDate: moment(each.exam.scheduledAt).format("HH:mm A, DD-MM-YYYY"),
                            difficulty: each.exam.difficulty,
                            questionCount: each.exam.questionCount,
                            ...each,
                        };
                    });
                    setResults(_allResults);
                    setRows(_allResults);
                    setTotalPages(Math.ceil(res.total / rowsPerPage));
                    setPage(1);
                    setData(_allResults);
                })
                .catch((e) => {
                    enqueueSnackbar(e && e.message ? e.message : 'Something went wrong!', {variant: 'warning'});
                })
                .finally(() => {
                    setLoading(false);
                });
        }


        return (
            <Box>
                <Card table>
                    <CardBody>
                        <ExamTableComponent
                            columns={columns}
                            rows={rows}
                            loading={loading}
                            notFound={'No Results Found'}
                            pageLimit={rowsPerPage}
                            setRow={setRow}
                        />
                        <Box display="flex" justifyContent="flex-end" m={3}>
                            <Pagination
                                color="primary"
                                count={totalPages}
                                onChange={handleChangePage}
                                page={page}
                                shape="rounded"
                            />
                        </Box>
                    </CardBody>
                </Card>
            </Box>
        );
    }
;

export default ResultsTable;