/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 28/06/21 4:09 am
 */
import {Box, Container, TextField} from "@material-ui/core";
import ResultsTable from "./components/result_table";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";


const StudentResults = () => {
    const [query, setQuery] = useState();
    return (
        <Container>
            <Box m={6}/>
            <Typography variant="h3">
                Search for Exam Results
            </Typography>
            <Box m={2}/>
            <Box width={'40%'}>
                <TextField
                    fullWidth
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    variant="outlined"
                    placeholder={"Type to search"}
                />
            </Box>
            <ResultsTable/>
        </Container>
    );
}


export default StudentResults