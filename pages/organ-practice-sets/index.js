import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, Container, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import {useRouter} from "next/router";
import OrganPracticeTable from "./components/organ-practice-table";
import {useSnackbar} from "notistack";
import {removeDraft} from "../../src/apis/exams";
import ConfirmDialog from "../../src/components/confirm/ConfirmDialog";


/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 04/07/21 5:11 am
 */



const OrganPracticeSets = () => {
    const [editId, setEditId] = useState('');
    const [query, setQuery] = useState('');
    const [deleteSet, setDeleteSet] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const Router = useRouter();
    const {enqueueSnackbar} = useSnackbar();


    const moreTableOptionCallBack = (i, id) => {
        console.log(id);
        setEditId(id);
        if (i === 1)
            Router.push(`/draft-details/${id}`);
        else if (i === 2)
            setDeleteSet(true);
    }


    const handleDelete = () => {
        setDeleteSet(false);
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
            <Typography data-aos="fade-down"
                        data-aos-duration="400" variant="h3">
                Search for Practice Sets
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
            <OrganPracticeTable refresh={refresh} search={query} moreCallBack={moreTableOptionCallBack}/>
            <ConfirmDialog show={deleteSet} dismiss={() => setDeleteSet(false)} title={'Delete draft'}
                           proceed={handleDelete}
                           confirmation={'Are you sure to delete this Practice set?'} okLabel={'yes'}/>
        </Container>
    )
}


export default OrganPracticeSets
