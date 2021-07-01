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

    const [tags, setTags] = useState([]);

    const selectTags = (tag) => {
        if (!tags.includes(tag)) {
            tags.push(tag);
            setTags(tags);
            console.log(tags);
        }
    }


    return (
        <Container>
            <Grid container>
                <Grid item md={8} xs={12} sm={12}>
                    <Box m={6}/>
                    <ExamsTable selectedTags={tags}/>
                </Grid>
                <Grid item md={4} xs={12} sm={12}>
                    <TopicFilter onClicked={selectTags}/>
                </Grid>
            </Grid>
        </Container>
    );
}


export default StudentExams