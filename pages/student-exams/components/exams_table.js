import React, {useEffect, useState} from 'react';
import {Box, makeStyles, TextField} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import {getAllExams} from '../../../src/apis/exams';
import {useSnackbar} from 'notistack';
import CardBody from '../../../src/components/cards/card_body';
import Card from '../../../src/components/cards/Card';
import {useRouter} from 'next/router';
import ExamTableComponent from "./exam_table_component";
import Typography from "@material-ui/core/Typography";
import cross from "../../../src/asset/cross_icon.svg";
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
        label: 'Exam Id',
        minWidth: 100,
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
        id: 'questionCount',
        label: 'No of Questions',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'difficulty',
        label: 'Difficulty',
        minWidth: 170,
        align: 'center',
    },
];

const ExamsTable = ({selectedTags, search}) => {

        console.log(selectedTags);
        const [page, setPage] = React.useState(1);
        const [totalPages, setTotalPages] = React.useState(20);
        const [rowsPerPage] = React.useState(12);
        const [exams, setExams] = React.useState([]);
        const [total, setTotal] = React.useState(0);
        const [rows, setRows] = React.useState([]);
        const [loading, setLoading] = React.useState(false);
        //const [search, setSearch] = React.useState('');
        const [clickedRow, setClickedRow] = React.useState(null);
        const classes = useStyles();

        const [data, setData] = useState([]);
        const Router = useRouter();
        const {enqueueSnackbar} = useSnackbar();

        // const headerStyles = makeStyles(styles);
        // const headerClasses = headerStyles();

        const setRow = (req) => {
            const index = data.findIndex(e => e._id.toString() === req._id.toString());
            setClickedRow(data[index]);
            Router.push(`/exam-details/${data[index]._id}`);
        };

        const loadCleaners = (skip) => {
            setLoading(true);
            getAllExams(skip, rowsPerPage, search, 2, selectedTags.map((e) => e._id), {'\$in': [1, 2]})
                .then((res) => {
                    if (res.data) {
                        let _allExams = res.data.map(each => {
                            return {
                                code: each._id.slice(each._id.length - 6, each._id.length).toUpperCase(),
                                formattedDate: moment(each.scheduledAt).format("HH:mm A, DD-MM-YYYY"),
                                ...each,
                            };
                        });
                        setRows(_allExams);
                        setExams([...exams, _allExams]);
                        setData([...data, ..._allExams]);
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
            if (value * rowsPerPage > exams.length) {
                setRows([]);
                if (exams.length === total) {
                    setRows(exams.slice((value - 1) * rowsPerPage, total));
                } else {
                    loadCleaners((value - 1) * rowsPerPage);
                }
            } else {
                setRows([]);
                setRows(exams.slice((value - 1) * rowsPerPage, value * rowsPerPage));
            }
        };


        useEffect(() => {
            setExams([]);
            setRows([]);
            setData([]);
            loadData();
        }, [search, selectedTags]);


        const loadData = () => {
            console.log("use effect");
            setLoading(true);
            getAllExams(0, rowsPerPage, search, 2, selectedTags.map((e) => e._id), {'\$in': [1, 2]})
                .then((res) => {
                    console.log("api response : ");
                    setTotal(res.total);
                    let _allCleaners = res.data.map(each => {
                        return {
                            code: each._id.slice(each._id.length - 6, each._id.length).toUpperCase(),
                            formattedDate: moment(each.scheduledAt).format("HH:mm A, DD-MM-YYYY"),
                            ...each,
                        };
                    });
                    setExams(_allCleaners);
                    setRows(_allCleaners);
                    setTotalPages(Math.ceil(res.total / rowsPerPage));
                    setPage(1);
                    setData(_allCleaners);
                })
                .catch((e) => {
                    enqueueSnackbar(e && e.message ? e.message : 'Something went wrong!', {variant: 'warning'});
                })
                .finally(() => {
                    setLoading(false);
                });
        }


        return (
            <Box data-aos="zoom-in"
                 data-aos-duration="400">

                <Card table>
                    <CardBody>
                        <ExamTableComponent
                            columns={columns}
                            rows={rows}
                            loading={loading}
                            notFound={'No Exams Found'}
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

export default ExamsTable;