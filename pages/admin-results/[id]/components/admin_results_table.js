import {Box, Tab, Tabs} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {Pagination} from "@material-ui/lab";
import {getAllResultsOfExam} from "../../../../src/apis/results";
import Card from "../../../../public/assets/jss/views/dashboardStyle";
import CardBody from "../../../../src/components/cards/card_body";
import DraftTableComponent from "../../../organ-drafts/components/draft_table_component";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description admin_exam_table.js
 * @createdOn 11/07/21 1:33 am
 */


const columns = [
    {
        id: 'studentName',
        label: 'Name',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'studentMail',
        label: 'Email',
        minWidth: 170,
        align: 'left',
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
    {
        id: 'more',
        label: 'More',
        minWidth: 170,
        align: 'center',
    },
];

const AdminResultsTable = ({moreCallBack, search, refresh, examId}) => {

        const [page, setPage] = React.useState(1);
        const [totalPages, setTotalPages] = React.useState(20);
        const [rowsPerPage] = React.useState(12);
        const [exams, setExams] = React.useState([]);
        const [total, setTotal] = React.useState(0);
        const [rows, setRows] = React.useState([]);
        const [loading, setLoading] = React.useState(false);
        const [clickedRow, setClickedRow] = React.useState(null);
        const [status, setStatus] = useState({'\$in': [1]});
        const [dialogValue, setDialogValue] = useState(0);


        const [data, setData] = useState([]);
        const {enqueueSnackbar} = useSnackbar();

        const setRow = (req) => {
            const index = data.findIndex(e => e._id.toString() === req._id.toString());
            setClickedRow(data[index]);
            //Router.push(`/draft-details/${data[index]._id}`);
        };

        const loadCleaners = (skip) => {
            setLoading(true);
            getAllResultsOfExam(skip, rowsPerPage, search, examId)
                .then((res) => {
                    if (res.data) {
                        let _allExams = res.data.map(each => {
                            return {
                                code: each._id.slice(each._id.length - 6, each._id.length).toUpperCase(),
                                studentName: each.createdBy.name,
                                studentMail: each.createdBy.email,
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
            setStatus({'\$in': [1]});
            loadData();
        }, [search, refresh, dialogValue]);


        const loadData = () => {
            console.log("use effect");
            setLoading(true);
            getAllResultsOfExam(0, rowsPerPage, search, examId)
                .then((res) => {
                    console.log("api response : ");
                    setTotal(res.total);
                    let _allCleaners = res.data.map(each => {
                        return {
                            code: each._id.slice(each._id.length - 6, each._id.length).toUpperCase(),
                            studentName: each.createdBy.name,
                            studentMail: each.createdBy.email,
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


        const moreTapCallBack = (choice, x) => {
            moreCallBack(choice, x);
        }


        return (
            <Box data-aos="fade-up"
                 data-aos-duration="400">
                <Card table>
                    <CardBody>
                        <DraftTableComponent
                            columns={columns}
                            rows={rows}
                            loading={loading}
                            notFound={'No Results Found'}
                            pageLimit={rowsPerPage}
                            setRow={setRow}
                            moreTap={moreTapCallBack}
                            moreArray={[1, 2]}
                            result={true}
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

export default AdminResultsTable;



