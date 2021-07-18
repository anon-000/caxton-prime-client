import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import {Container, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import {useRouter} from "next/router";
import AdminExamTable from "./components/admin_exam_table";
import ConfirmDialog from "../../src/components/confirm/ConfirmDialog";
import {removeDraft} from "../../src/apis/exams";
import {useSnackbar} from "notistack";


/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 10/07/21 7:10 pm
 */

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    clickable: {
        cursor: "pointer",
        userSelect: "none",
    },
}));

const AdminExams = () => {
    const classes = useStyles();
    const [editId, setEditId] = useState('');
    const [query, setQuery] = useState('');
    const [deleteExam, setDeleteExam] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const Router = useRouter();
    const {enqueueSnackbar} = useSnackbar();


    const moreTableOptionCallBack = (i, id) => {
        console.log(id);
        setEditId(id);
        if (i === 1)
            Router.push(`/draft-details/${id}`);
        else if (i === 2)
            setDeleteExam(true);
    }

    const handleDelete = () => {
        setDeleteExam(false);
        removeDraft(editId).then((res) => {
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
                Search for Exams
            </Typography>
            <Box m={2}/>
            <TextField
                fullWidth
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                variant="outlined"
                placeholder={"Type to search"}
            />
            <AdminExamTable refresh={refresh} search={query} moreCallBack={moreTableOptionCallBack}/>
            <ConfirmDialog show={deleteExam} dismiss={() => setDeleteExam(false)} title={'Delete draft'}
                           proceed={handleDelete}
                           confirmation={'Are you sure to delete this exam?'} okLabel={'yes'}/>
        </Container>
    )
}


export default AdminExams
