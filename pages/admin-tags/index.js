import {makeStyles} from "@material-ui/core/styles";
import {Box, Container, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AddTagCard from "./components/add_tag_card";
import TagsTable from "./components/tag_table";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import ConfirmDialog from "../../src/components/confirm/ConfirmDialog";
import {deleteTag} from "../../src/apis/tags";
import {useSnackbar} from "notistack";
import Hidden from "@material-ui/core/Hidden";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 04/07/21 5:00 am
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

const AdminTags = () => {
    const classes = useStyles();
    const [query, setQuery] = useState('');
    const [id, setId] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const {enqueueSnackbar} = useSnackbar();


    const moreCallBack = (i, id) => {
        if (i === 1) {
            console.log(`id : ${id} :: index : ${i}`);
            setId(id);
            setDeleteOpen(true);
        }
    }

    const onNewTagAdded = (tag) => {
        setRefresh(!refresh);
    }

    const handleDeleteTag = () => {
        setDeleteOpen(false);
        deleteTag(id).then((res) => {
            setRefresh(!refresh);
            enqueueSnackbar("Tag deleted successfully", {variant: "success"});
        }).catch((error) => {
            enqueueSnackbar(
                error.message && error.message
                    ? error.message
                    : "Something went wrong!",
                {variant: "warning"}
            );
        });
    }


    return (
        <Container>
            <Grid container>
                <Grid item md={7} xs={12} sm={12}>
                    <Box m={6}/>
                    <Typography data-aos="fade-down"
                                data-aos-duration="400" variant="h3">
                        Search for Exam Tags
                    </Typography>
                    <Box m={2}/>
                    <TextField
                        data-aos="zoom-in"
                        data-aos-duration="400"
                        fullWidth
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        variant="outlined"
                        placeholder={"Type to search"}
                    />
                    <Box m={2}/>
                    <TagsTable search={query} refresh={refresh} moreCallBack={moreCallBack}/>
                    <ConfirmDialog show={deleteOpen} dismiss={() => setDeleteOpen(false)} title={'Delete draft'}
                                   proceed={handleDeleteTag}
                                   confirmation={'Are you sure to delete this tag?'} okLabel={'yes'}/>
                </Grid>
                <Grid item md={5} xs={12} sm={12}>
                    <Hidden smDown>
                        <Box position={'fixed'} top={34} right={6}>
                            <AddTagCard onNewTag={onNewTagAdded}/>
                        </Box>
                    </Hidden>
                </Grid>
            </Grid>
        </Container>
    )
}

export default AdminTags
