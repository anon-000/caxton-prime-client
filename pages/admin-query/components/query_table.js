/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description admin_requests_table.js
 * @createdOn 08/07/21 4:21 pm
 */

import {Box} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import Card from "../../../src/components/cards/Card";
import CardBody from "../../../src/components/cards/card_body";
import {Pagination} from "@material-ui/lab";
import DraftTableComponent from "../../organ-drafts/components/draft_table_component";
import {deleteUser, getAllPendingOrgans, userPatch} from "../../../src/apis/users";
import ConfirmDialog from "../../../src/components/confirm/ConfirmDialog";
import {getAllQueries} from "../../../src/apis/query";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description draft_table.js
 * @createdOn 04/07/21 4:53 pm
 */

const columns = [
    {
        id: 'code',
        label: 'Id',
        minWidth: 130,
        align: 'center',
    },
    {
        id: 'name',
        label: 'Name',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 160,
        align: 'left',
    },
    {
        id: 'phone',
        label: 'Phone',
        minWidth: 210,
        align: 'center',
    },
    {
        id: 'msg',
        label: 'Query',
        minWidth: 210,
        align: 'center',
    },
];

const AdminQueriesTable = ({moreCallBack, search}) => {

        const [page, setPage] = React.useState(1);
        const [totalPages, setTotalPages] = React.useState(20);
        const [rowsPerPage] = React.useState(12);
        const [requests, setRequests] = React.useState([]);
        const [total, setTotal] = React.useState(0);
        const [rows, setRows] = React.useState([]);
        const [loading, setLoading] = React.useState(false);
        const [confirmOpen, setConfirmOpen] = React.useState(false);
        const [refresh, setRefresh] = React.useState(false);
        const [type, setType] = React.useState(1);
        const [id, setId] = React.useState('');
        const [clickedRow, setClickedRow] = React.useState(null);

        const [data, setData] = useState([]);
        const {enqueueSnackbar} = useSnackbar();
        const setRow = (req) => {
            const index = data.findIndex(e => e._id.toString() === req._id.toString());
            setClickedRow(data[index]);
            //Router.push(`/draft-details/${data[index]._id}`);
        };

        const loadRequests = (skip) => {
            setLoading(true);
            getAllQueries(skip, rowsPerPage, search)
                .then((res) => {
                    if (res.data) {
                        let _allReq = res.data.map(each => {
                            return {
                                code: each._id.slice(each._id.length - 6, each._id.length).toUpperCase(),
                                ...each,
                            };
                        });
                        setRows(_allReq);
                        setRequests([...requests, _allReq]);
                        setData([...requests, ..._allReq]);
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
            if (value * rowsPerPage > requests.length) {
                setRows([]);
                if (requests.length === total) {
                    setRows(requests.slice((value - 1) * rowsPerPage, total));
                } else {
                    loadRequests((value - 1) * rowsPerPage);
                }
            } else {
                setRows([]);
                setRows(requests.slice((value - 1) * rowsPerPage, value * rowsPerPage));
            }
        };


        useEffect(() => {
            setRequests([]);
            setRows([]);
            setData([]);
            loadData();
        }, [search, refresh]);


        const loadData = () => {
            console.log("use effect");
            setLoading(true);
            getAllQueries(0, rowsPerPage, search)
                .then((res) => {
                    console.log("api response : ");
                    setTotal(res.total);
                    let _allRequests = res.data.map(each => {
                        return {
                            code: each._id.slice(each._id.length - 6, each._id.length).toUpperCase(),
                            ...each,
                        };
                    });
                    setRequests(_allRequests);
                    setRows(_allRequests);
                    setTotalPages(Math.ceil(res.total / rowsPerPage));
                    setPage(1);
                    setData(_allRequests);
                })
                .catch((e) => {
                    enqueueSnackbar(e && e.message ? e.message : 'Something went wrong!', {variant: 'warning'});
                })
                .finally(() => {
                    setLoading(false);
                });
        }


        const moreTapCallBack = (choice, x) => {
            setId(x);
            setType(choice);
            setConfirmOpen(true);
            /// 1 - accept. 2 - reject, x - id
        }

        const handleDialog = () => {
            setConfirmOpen(false);
            if (type === 1) {
                /// accept - patch status 2
                userPatch(id, {"status": 2}).then((res) => {
                    setRefresh(!refresh);
                }).catch((e) => {
                    enqueueSnackbar(e && e.message ? e.message : 'Something went wrong!', {variant: 'warning'});
                }).finally(() => {
                });
            } else if (type === 2) {
                /// reject - delete user
                deleteUser(id).then((res) => {
                    setRefresh(!refresh);
                }).catch((e) => {
                    enqueueSnackbar(e && e.message ? e.message : 'Something went wrong!', {variant: 'warning'});
                }).finally(() => {
                });
            }
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
                            notFound={'No Requests Found'}
                            pageLimit={rowsPerPage}
                            setRow={setRow}
                            moreTap={moreTapCallBack}
                        />
                        <ConfirmDialog show={confirmOpen} dismiss={() => setConfirmOpen(false)} title={'Confirm'}
                                       proceed={() => handleDialog()}
                                       confirmation={`Are you sure to you want to ${type === 1 ? "accept" : "reject"} this organization request?`}
                                       okLabel={'yes'}/>
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

export default AdminQueriesTable;