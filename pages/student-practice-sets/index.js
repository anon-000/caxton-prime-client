/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 07/07/21 1:25 am
 */

import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import TopicFilter from "../student-exams/components/topic_filter";
import PracticeTable from "./components/practice_table";


const PracticeExams = () => {

    const [tags, setTags] = useState([]);

    console.log(tags);

    const selectTags = (tag) => {
        console.log(tag);
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    }

    const removeAtIndex = (index) => {
        let _list = tags;
        _list.splice(index, 1);
        setTags([..._list]);
    }


    return (
        <Container>
            <Grid container>
                <Grid item md={9} xs={12} sm={12}>
                    <Box m={6}/>
                    <PracticeTable selectedTags={tags} onRemoveTag={removeAtIndex}/>
                </Grid>
                <Grid item md={3} xs={12} sm={12}>
                    <TopicFilter onClicked={selectTags}/>
                </Grid>
            </Grid>
        </Container>
    );
}


export default PracticeExams