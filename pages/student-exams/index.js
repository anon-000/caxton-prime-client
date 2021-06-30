/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 28/06/21 4:07 am
 */
import {Container, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ExamsTable from "./components/exams_table";
import TopicFilter from "./components/topic_filter";


const StudentExams = () => {

    const [query, setQuery] = useState("");
    const [selectedTags, setTags] = useState([]);


    return (
        <Container>
            <Grid container>
                <Grid item md={8} xs={12} sm={12}>
                    <Box m={6}/>
                    <Typography variant="h3">
                        Search for practice sets
                    </Typography>
                    <Box m={2}/>
                    <TextField
                        fullWidth
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        variant="outlined"
                        placeholder={"Type to search"}
                    />
                    <ExamsTable/>
                </Grid>
                <Grid item md={4} xs={12} sm={12}>
                    <TopicFilter/>
                </Grid>
            </Grid>
        </Container>
    );
}


export default StudentExams