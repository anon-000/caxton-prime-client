import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, Container, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import DraftTable from "./components/draft_table";
import Grid from "@material-ui/core/Grid";
import CreateDraftDialog from "./components/create_draft_dialog";
import ScheduledExamDialog from "./components/schedule_exam_dialog";
import {useRouter} from "next/router";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 04/07/21 5:09 am
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

const OrganDrafts = () => {
    const classes = useStyles();
    const [draftOpen, setDraftOpen] = useState();
    const [scheduleOpen, setScheduleOpen] = useState();
    const [practiceOpen, setPracticeOpen] = useState();
    let query = '';
    const Router = useRouter();

    const handleClickOpen = (i) => {
        console.log(i);
        if (i === 1)
            setDraftOpen(true);
        else if (i === 2)
            setScheduleOpen(true);
        else if (i === 3)
            setPracticeOpen(true);
    };

    const handleClose = (i) => {
        if (i === 1)
            setDraftOpen(false);
        else if (i === 2)
            setScheduleOpen(false);
        else if (i === 3)
            setPracticeOpen(false);

    };

    const moreTableOptionCallBack = (i, id) => {
        console.log(id);
        if (i === 1)
            Router.push(`/draft-details/${id}`);
        else if (i === 3)
            handleClickOpen(2);
    }


    return (
        <Container>
            <Box m={6}/>
            <Typography variant="h3">
                Search for Drafts
            </Typography>
            <Box m={2}/>
            <Grid container>
                <Grid item md={4}>
                    <TextField
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
                    <ScheduledExamDialog handleClose={handleClose} open={scheduleOpen}/>
                </Grid>
            </Grid>
            <DraftTable moreCallBack={moreTableOptionCallBack}/>
        </Container>
    )
}


export default OrganDrafts
