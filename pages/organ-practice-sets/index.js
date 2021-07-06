import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, Container, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import {useRouter} from "next/router";
import OrganPracticeTable from "./components/organ-practice-table";


/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 04/07/21 5:11 am
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

const OrganPracticeSets = () => {
    const classes = useStyles();
    const [editId, setEditId] = useState('');
    let query = '';
    const Router = useRouter();


    const moreTableOptionCallBack = (i, id) => {
        console.log(id);
        setEditId(id);
        // if (i === 1)
        //     Router.push(`/draft-details/${id}`);
        // else if (i === 3)
        //     handleClickOpen(2);
        // else if (i === 4)
        //     handleClickOpen(3);
        // else if (i === 2)
        //     handleClickOpen(4);
    }

    return (
        <Container>
            <Box m={6}/>
            <Typography variant="h3">
                Search for Practice Sets
            </Typography>
            <Box m={2}/>
            <TextField
                fullWidth
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                variant="outlined"
                placeholder={"Type to search"}
            />
            <OrganPracticeTable moreCallBack={moreTableOptionCallBack}/>
        </Container>
    )
}


export default OrganPracticeSets
