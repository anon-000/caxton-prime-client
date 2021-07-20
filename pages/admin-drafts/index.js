import {makeStyles} from "@material-ui/core/styles";
import React, {useState} from "react";
import {useRouter} from "next/router";
import {useSnackbar} from "notistack";
import {removeDraft} from "../../src/apis/exams";
import {Box, Button, Container, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CreateDraftDialog from "../organ-drafts/components/create_draft_dialog";
import ScheduledExamDialog from "../organ-drafts/components/schedule_exam_dialog";
import PracticeSetDialog from "../organ-drafts/components/create_practice_dialog";
import ConfirmDialog from "../../src/components/confirm/ConfirmDialog";
import AdminDraftTable from "./components/admin_drafts_table";

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

const AdminDrafts = () => {
    const classes = useStyles();
    const [draftOpen, setDraftOpen] = useState();
    const [scheduleOpen, setScheduleOpen] = useState();
    const [practiceOpen, setPracticeOpen] = useState();
    const [deleteOpen, setDeleteOpen] = useState();
    const [editId, setEditId] = useState('');
    const [query, setQuery] = useState('');
    const [refresh, setRefresh] = useState(false);
    const Router = useRouter();
    const {enqueueSnackbar} = useSnackbar();

    const handleClickOpen = (i) => {
        console.log(i);
        if (i === 1)
            setDraftOpen(true);
        else if (i === 2)
            setScheduleOpen(true);
        else if (i === 3)
            setPracticeOpen(true);
        else if (i === 4)
            setDeleteOpen(true);
    };

    const handleClose = (i) => {
        if (i === 1)
            setDraftOpen(false);
        else if (i === 2)
            setScheduleOpen(false);
        else if (i === 3)
            setPracticeOpen(false);
        else if (i === 4)
            setDeleteOpen(false);

    };

    const moreTableOptionCallBack = (i, id) => {
        console.log(id);
        setEditId(id);
        if (i === 1)
            Router.push(`/draft-details/${id}`);
        else if (i === 3)
            handleClickOpen(2);
        else if (i === 4)
            handleClickOpen(3);
        else if (i === 2)
            handleClickOpen(4);
    }

    const deleteDraft = () => {
        setDeleteOpen(false);
        removeDraft(editId).then((res) => {
            setRefresh(!refresh);
        }).catch((e) => {
            enqueueSnackbar(e && e.message ? e.message : 'Something went wrong!', {variant: 'warning'});
        });
    }


    return (
        <Container>
            <Box m={6}/>
            <Typography data-aos="fade-down"
                        data-aos-duration="400" variant="h3">
                Search for Drafts
            </Typography>
            <Box m={2}/>
            <Grid container>
                <Grid item md={4}>
                    <TextField
                        data-aos="zoom-in"
                        data-aos-duration="400"
                        fullWidth
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        variant="outlined"
                        placeholder={"Type to search"}
                    />
                </Grid>
                <Grid item md={6}/>
                <Grid item md={2}>
                    <Button
                        fullWidth
                        // disabled={loading}
                        onClick={() => handleClickOpen(1)}
                        color="primary"
                        variant="contained"
                    >
                        Create Draft
                    </Button>
                    <CreateDraftDialog handleClose={handleClose} open={draftOpen}/>
                    <ScheduledExamDialog onChanged={() => setRefresh(!refresh)} examId={editId}
                                         handleClose={handleClose} open={scheduleOpen}/>
                    <PracticeSetDialog examId={editId} handleClose={handleClose} open={practiceOpen}/>
                    <ConfirmDialog show={deleteOpen} dismiss={() => handleClose(4)} title={'Delete draft'}
                                   proceed={deleteDraft}
                                   confirmation={'Are you sure to delete this draft?'} okLabel={'yes'}/>
                </Grid>
            </Grid>
            <AdminDraftTable search={query} refresh={refresh} moreCallBack={moreTableOptionCallBack}/>
        </Container>
    )
}


export default AdminDrafts
