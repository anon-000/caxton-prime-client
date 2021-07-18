/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 18/07/21 8:49 pm
 */
import {Container, TextField} from "@material-ui/core";
import {useRouter} from "next/router";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ConfirmDialog from "../../../src/components/confirm/ConfirmDialog";
import React, {useState} from "react";
import {useSnackbar} from "notistack";
import AdminResultsTable from "./components/admin_results_table";
import {deleteResult} from "../../../src/apis/results";


const ExamResults = () => {
    const Router = useRouter();
    const {id} = Router.query;
    const [editId, setEditId] = useState('');
    const [query, setQuery] = useState('');
    const [deleteExam, setDeleteExam] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const {enqueueSnackbar} = useSnackbar();


    const moreTableOptionCallBack = (i, id) => {
        console.log(id);
        setEditId(id);

        if (i === 2)
            setDeleteExam(true);
    }

    const handleDelete = () => {
        setDeleteExam(false);
        deleteResult(editId).then((res) => {
            setRefresh(!refresh);
        }).catch((e) => {
            enqueueSnackbar(e && e.message ? e.message : 'Something went wrong!', {variant: 'warning'});
        }).finally(() => {
        });
    }

    return (
        <Container>
            <Box m={6}/>
            <Typography variant="h3">
                Search for Student Results
            </Typography>
            <Box m={2}/>
            <TextField
                fullWidth
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                variant="outlined"
                placeholder={"Type to search"}
            />
            <AdminResultsTable examId={id} refresh={refresh} search={query} moreCallBack={moreTableOptionCallBack}/>
            <ConfirmDialog show={deleteExam} dismiss={() => setDeleteExam(false)} title={'Delete draft'}
                           proceed={handleDelete}
                           confirmation={'Are you sure to delete this exam?'} okLabel={'yes'}/>
        </Container>
    )
}


export default ExamResults