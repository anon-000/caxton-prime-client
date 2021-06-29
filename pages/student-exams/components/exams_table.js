import React, {useEffect, useState} from 'react';
import {Box, makeStyles} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import {getAllExams} from '../../../src/apis/exams';
import {useSnackbar} from 'notistack';
import CardBody from '../../../src/components/cards/card_body';
import Card from '../../../src/components/cards/Card';
import {useRouter} from 'next/router';
import TableComponent from "../../../src/components/table_component";


/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description exams_table.js
 * @createdOn 29/06/21 5:53 pm
 */


const columns = [
    {
        id: 'id',
        label: 'Exam Id',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'title',
        label: 'Name',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'noOfQuestion',
        label: 'No of Questions',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'difficulty',
        label: 'Difficulty',
        minWidth: 170,
        align: 'left',
    },
];

const ExamsTable = () => {

    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(20);
    const [rowsPerPage] = React.useState(6);
    const [exams, setExams] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [clickedRow, setClickedRow] = React.useState(null);
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
        getAllExams(skip, rowsPerPage, search)
            .then((res) => {
                if (res.data) {
                    let _allExams = res.data.map(each => {
                        return {
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
        setLoading(true);
        getAllExams(0, rowsPerPage, search)
            .then((res) => {
                setTotal(res.total);
                let _allCleaners = res.data.map(each => {
                    return {
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
    }, [search]);

    return (
        <Card table>
            {/*<CardHeader color="primary">*/}
            {/*    <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>*/}
            {/*        <Box display={'flex'} flexDirection={'column'}>*/}
            {/*            <h4 className={headerClasses.cardTitleWhite}>List of Cleaners</h4>*/}
            {/*            <p className={headerClasses.cardCategoryWhite}>*/}
            {/*                Of your zone*/}
            {/*            </p>*/}
            {/*        </Box>*/}
            {/*        <Box flex={1}/>*/}
            {/*        <GreenSearchField*/}
            {/*            placeholder={'Search'}*/}
            {/*            searchValue={search}*/}
            {/*            onChange={(val) => {*/}
            {/*                setRows([]);*/}
            {/*                setSearch(val);*/}
            {/*            }}*/}
            {/*        />*/}
            {/*    </Box>*/}
            {/*</CardHeader>*/}
            <CardBody>
                <TableComponent
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
    );
};

export default ExamsTable;