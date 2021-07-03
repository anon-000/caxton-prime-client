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

const ExamsTable = ({selectedTags, onRemoveTag}) => {

        console.log(selectedTags);
        const [page, setPage] = React.useState(1);
        const [totalPages, setTotalPages] = React.useState(20);
        const [rowsPerPage] = React.useState(12);
        const [exams, setExams] = React.useState([]);
        const [total, setTotal] = React.useState(0);
        const [rows, setRows] = React.useState([]);
        const [loading, setLoading] = React.useState(false);
        const [search, setSearch] = React.useState('');
        const [clickedRow, setClickedRow] = React.useState(null);
        const [query, setQuery] = useState("");
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
            getAllExams(skip, rowsPerPage, search)
                .then((res) => {
                    if (res.data) {
                        let _allExams = res.data.map(each => {
                            return {
                                code: each._id.slice(each._id.length - 6, each._id.length).toUpperCase(),
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
            getAllExams(0, rowsPerPage, search)
                .then((res) => {
                    console.log("api response : ");
                    setTotal(res.total);
                    let _allCleaners = res.data.map(each => {
                        return {
                            code: each._id.slice(each._id.length - 6, each._id.length).toUpperCase(),
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
            <Box>
                <Typography variant="h3">
                    Search for Exams
                </Typography>
                <Box m={2}/>
                <Box width={'50%'}>
                    <TextField
                        fullWidth
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        variant="outlined"
                        placeholder={"Type to search"}
                    />
                </Box>
                {
                    selectedTags.length === 0 ? <Box/> : <Box display={"flex"} flexWrap={'wrap'} mt={3} mb={-1}>
                        {
                            selectedTags.map((e) => <Box
                                    display={'flex'}
                                    className={classes.withHover}
                                    my={0.8} mr={0.8} px={2} borderRadius={16}
                                    borderColor={'#FFEEF2'} bgcolor={'#FFEEF2'}
                                    color={'#F03D5F'} py={0.6}>
                                    {e.name}
                                    <Box ml={1.5} mt={0.2} onClick={() => onRemoveTag(e)}>
                                        <img src={cross} alt={'x'}/>
                                    </Box>
                                </Box>
                            )
                        }
                    </Box>
                }

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