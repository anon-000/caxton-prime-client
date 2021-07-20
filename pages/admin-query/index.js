import {makeStyles} from "@material-ui/core/styles";
import {Box, Container, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import AdminQueriesTable from "./components/query_table";

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

const AdminQueries = () => {
    const classes = useStyles();
    const [query, setQuery] = useState();

    return (
        <Container>
            <Box m={6}/>
            <Typography data-aos="fade-down"
                        data-aos-duration="400" variant="h3">
                Search for User Queries
            </Typography>
            <Box m={2}/>
            <Box width={'40%'}>
                <TextField
                    data-aos="zoom-in"
                    data-aos-duration="400"
                    fullWidth
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    variant="outlined"
                    placeholder={"Type to search"}
                />
            </Box>
            <AdminQueriesTable search={query}/>
        </Container>
    )
}

export default AdminQueries
