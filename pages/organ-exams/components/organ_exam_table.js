import {Box, makeStyles, Tab, Tabs, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {getAllMyExams} from "../../../src/apis/exams";
import Card from "../../../src/components/cards/Card";
import CardBody from "../../../src/components/cards/card_body";
import {Pagination} from "@material-ui/lab";
import DraftTableComponent from "../../organ-drafts/components/draft_table_component";
import moment from "moment/moment";
import withStyles from "@material-ui/core/styles/withStyles";
import {useStore} from "laco-react";
import userStore from "../../../src/store/userStore";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description draft_table.js
 * @createdOn 04/07/21 4:53 pm
 */



const AntTabs = withStyles((theme) => ({
    indicator: {
        backgroundColor: '#F03D5F',
        color: '#fff'
    },
}))(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        background: '#ff6583',
        borderRadius: '5px 5px 0px 0px',
        color: '#FFFFFF',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
        textTransform: 'none',
        height: '60px'
    },
    selected: {
        color: '#fff',
        background: '#F03D5F',
    },
}))((props) => <Tab disableRipple {...props} />);

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
        id: 'formattedDate',
        label: 'Scheduled At',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'duration',
        label: 'Duration',
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
        id: 'more',
        label: 'More',
        minWidth: 170,
        align: 'center',
    },
];

const OrganExamTable = ({moreCallBack, search, refresh, result = false}) => {

        const [page, setPage] = React.useState(1);
        const [totalPages, setTotalPages] = React.useState(20);
        const [rowsPerPage] = React.useState(12);
        const [exams, setExams] = React.useState([]);
        const [total, setTotal] = React.useState(0);
        const [rows, setRows] = React.useState([]);
        const [loading, setLoading] = React.useState(false);
        const [clickedRow, setClickedRow] = React.useState(null);
        const [dialogValue, setDialogValue] = useState(0);
        const [status, setStatus] = useState({'\$in': [result ? 3 : 1]});

        const {user} = useStore(userStore);
        const [data, setData] = useState([]);
        const {enqueueSnackbar} = useSnackbar();

        const setRow = (req) => {
            const index = data.findIndex(e => e._id.toString() === req._id.toString());
            setClickedRow(data[index]);
            //Router.push(`/draft-details/${data[index]._id}`);
        };

        const loadCleaners = (skip) => {
            setLoading(true);
            getAllMyExams(skip, rowsPerPage, search, 2, [], status, user._id)
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
            setStatus({'\$in': [1]});
            loadData();
        }, [search, refresh, dialogValue]);


        const loadData = () => {
            console.log("use effect");
            setLoading(true);
            getAllMyExams(0, rowsPerPage, search, 2, [], status, user._id)
                .then((res) => {
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


        const moreTapCallBack = (choice, x) => {
            moreCallBack(choice, x);
        }

        function a11yProps(index) {
            return {
                id: `scrollable-auto-tab-${index}`,
                'aria-controls': `scrollable-auto-tabpanel-${index}`,
            };
        }

        const handleChangeDialogValue = (e, newValue) => {
            setDialogValue(newValue);
            console.log(newValue);
            setStatus({'\$in': [newValue + 1]});
        };

        return (
            <Box data-aos="zoom-in"
                 data-aos-duration="400">
                <Card table>
                    {
                        result ? <Box/> : <AntTabs aria-label="disabled tabs example" onChange={handleChangeDialogValue}
                                                   value={dialogValue}>
                            <AntTab label="Scheduled" {...a11yProps(0)} />
                            <AntTab label="Ongoing" {...a11yProps(1)} />
                            <AntTab label="Completed" {...a11yProps(2)} />
                        </AntTabs>
                    }
                    <CardBody>
                        <DraftTableComponent
                            columns={columns}
                            rows={rows}
                            loading={loading}
                            notFound={'No Exams Found'}
                            pageLimit={rowsPerPage}
                            setRow={setRow}
                            moreTap={moreTapCallBack}
                            moreArray={[1, 2]}
                            result={result}
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

export default OrganExamTable;