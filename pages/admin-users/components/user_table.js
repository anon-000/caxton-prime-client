import {Box} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import Card from "../../../src/components/cards/Card";
import CardBody from "../../../src/components/cards/card_body";
import {Pagination} from "@material-ui/lab";
import DraftTableComponent from "../../organ-drafts/components/draft_table_component";
import {deleteUser, getAllPendingOrgans, userPatch} from "../../../src/apis/users";
import ConfirmDialog from "../../../src/components/confirm/ConfirmDialog";
import UserDialog from "./user_dialog";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description user_table.js
 * @createdOn 10/07/21 7:36 pm
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
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'more',
        label: 'Actions',
        minWidth: 170,
        align: 'center',
    },
];

const AdminUsersTable = ({moreCallBack, search}) => {

        const [page, setPage] = React.useState(1);
        const [totalPages, setTotalPages] = React.useState(20);
        const [rowsPerPage] = React.useState(12);
        const [requests, setRequests] = React.useState([]);
        const [total, setTotal] = React.useState(0);
        const [rows, setRows] = React.useState([]);
        const [loading, setLoading] = React.useState(false);
        const [confirmOpen, setConfirmOpen] = React.useState(false);
        const [userOpen, setUserOpen] = React.useState(false);
        const [refresh, setRefresh] = React.useState(false);
        const [type, setType] = React.useState(1);
        const [selectedId, setSelectedId] = React.useState('');
        const [clickedRow, setClickedRow] = React.useState(null);

        const [data, setData] = useState([]);
        const {enqueueSnackbar} = useSnackbar();
        const setRow = (req) => {
            const index = data.findIndex(e => e._id.toString() === req._id.toString());
            setClickedRow(data[index]);
            // setId(data[index]._id);
            //Router.push(`/draft-details/${data[index]._id}`);
        };

        const loadRequests = (skip) => {
            setLoading(true);
            getAllPendingOrgans(skip, rowsPerPage, search)
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
            getAllPendingOrgans(0, rowsPerPage, search)
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
            setSelectedId(x);
            setType(choice);
            console.log("choicee id", x);
            if (choice === 1) {
                setUserOpen(true);
            } else if (choice === 2) {
                setConfirmOpen(true);
            }

            /// 1 - accept. 2 - reject, x - id
        }

        const handleDialog = () => {
            setConfirmOpen(false);
            console.log(selectedId);
            if (type === 1) {

            } else if (type === 2) {
                deleteUser(selectedId).then((res) => {
                    console.log(res);
                    setRefresh(!refresh);
                }).catch((e) => {
                    enqueueSnackbar(e && e.message ? e.message : 'Something went wrong!', {variant: 'warning'});
                }).finally(() => {
                });
            }
        }


        return (
            <Box>
                <Card table>
                    <CardBody>
                        <DraftTableComponent
                            columns={columns}
                            rows={rows}
                            loading={loading}
                            notFound={'No Users Found'}
                            pageLimit={rowsPerPage}
                            setRow={setRow}
                            moreTap={moreTapCallBack}
                            moreArray={[1, 2]}
                        />
                        <ConfirmDialog show={confirmOpen} dismiss={() => setConfirmOpen(false)} title={'Confirm'}
                                       proceed={() => handleDialog()}
                                       confirmation={`Are you sure to you want to delete this user?`}
                                       okLabel={'yes'}/>
                        <UserDialog refresh={() => setRefresh(!refresh)} open={userOpen} userId={selectedId}
                                    handleClose={() => setUserOpen(false)}/>
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

export default AdminUsersTable;
