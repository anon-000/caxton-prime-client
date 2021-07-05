import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, Container, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import DraftTable from "./components/draft_table";
import Grid from "@material-ui/core/Grid";
import CreateDraftDialog from "./components/create_draft_dialog";

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
    const [open, setOpen] = useState();
    let query = '';

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


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
                        onClick={handleClickOpen}
                        color="primary"
                        variant="contained"
                    >
                        Create Draft
                    </Button>
                    <CreateDraftDialog handleClose={handleClose} open={open}/>
                </Grid>
            </Grid>
            <DraftTable/>
        </Container>
    )
}


export default OrganDrafts
