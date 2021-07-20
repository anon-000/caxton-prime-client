/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 10/07/21 7:10 pm
 */
import Box from "@material-ui/core/Box";
import React, {useState} from "react";
import {Container, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AdminPracticeTable from "./components/admin_practice_table";
import {useRouter} from "next/router";
import {removeDraft} from "../../src/apis/exams";
import {useSnackbar} from "notistack";
import ConfirmDialog from "../../src/components/confirm/ConfirmDialog";


const AdminSets = () => {
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
            <AdminPracticeTable refresh={refresh} search={query} moreCallBack={moreTableOptionCallBack}/>
            <ConfirmDialog show={deleteSet} dismiss={() => setDeleteSet(false)} title={'Delete draft'}
                           proceed={handleDelete}
                           confirmation={'Are you sure to delete this Practice set?'} okLabel={'yes'}/>
        </Container>
    )
}


export default AdminSets
