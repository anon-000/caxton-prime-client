import {Box} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import Card from "../../../src/components/cards/Card";
import CardBody from "../../../src/components/cards/card_body";
import {Pagination} from "@material-ui/lab";
import {getTags} from "../../../src/apis/tags";
import DraftTableComponent from "../../organ-drafts/components/draft_table_component";

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
        label: 'Exam Id',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'name',
        label: 'Name',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'delete',
        label: 'Actions',
        minWidth: 170,
        align: 'center',
    },
];

const TagsTable = ({moreCallBack, refresh, search}) => {

        const [page, setPage] = React.useState(1);
        const [totalPages, setTotalPages] = React.useState(20);
        const [rowsPerPage] = React.useState(12);
        const [tags, setTags] = React.useState([]);
        const [total, setTotal] = React.useState(0);
        const [rows, setRows] = React.useState([]);
        const [loading, setLoading] = React.useState(false);
        const [clickedRow, setClickedRow] = React.useState(null);

        const [data, setData] = useState([]);
        const {enqueueSnackbar} = useSnackbar();
        const setRow = (req) => {
            const index = data.findIndex(e => e._id.toString() === req._id.toString());
            setClickedRow(data[index]);
            //Router.push(`/draft-details/${data[index]._id}`);
        };

        const loadTags = (skip) => {
            setLoading(true);
            getTags(skip, rowsPerPage, search)
                .then((res) => {
                    if (res.data) {
                        let _allTags = res.data.map(each => {
                            return {
                                code: each._id.slice(each._id.length - 6, each._id.length).toUpperCase(),
                                ...each,
                            };
                        });
                        setRows(_allTags);
                        setTags([...tags, _allTags]);
                        setData([...data, ..._allTags]);
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
            if (value * rowsPerPage > tags.length) {
                setRows([]);
                if (tags.length === total) {
                    setRows(tags.slice((value - 1) * rowsPerPage, total));
                } else {
                    loadTags((value - 1) * rowsPerPage);
                }
            } else {
                setRows([]);
                setRows(tags.slice((value - 1) * rowsPerPage, value * rowsPerPage));
            }
        };


        useEffect(() => {
            setTags([]);
            setRows([]);
            setData([]);
            loadData();
        }, [search, refresh]);


        const loadData = () => {
            console.log("use effect");
            setLoading(true);
            getTags(0, rowsPerPage, search)
                .then((res) => {
                    console.log("api response : ");
                    setTotal(res.total);
                    let _allTags = res.data.map(each => {
                        return {
                            code: each._id.slice(each._id.length - 6, each._id.length).toUpperCase(),
                            ...each,
                        };
                    });
                    setTags(_allTags);
                    setRows(_allTags);
                    setTotalPages(Math.ceil(res.total / rowsPerPage));
                    setPage(1);
                    setData(_allTags);
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
            <Box>
                <Card table>
                    <CardBody>
                        <DraftTableComponent
                            columns={columns}
                            rows={rows}
                            loading={loading}
                            notFound={'No Tags Found'}
                            pageLimit={rowsPerPage}
                            setRow={setRow}
                            moreTap={moreTapCallBack}
                        />
                        {/*<ConfirmDialog show={deleteOpen} dismiss={() => handleClose(4)} title={'Delete draft'}*/}
                        {/*               confirmation={'Are you sure to delete this draft?'} okLabel={'yes'}/>*/}
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

export default TagsTable;