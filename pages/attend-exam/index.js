import React, {useEffect, useState} from "react";
import {Container, Grid} from "@material-ui/core";
import TimerCard from "./components/timer_card";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import QuestionCard from "./components/question_card";
import ExamActions from "./components/exam_actions";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 13/06/21 10:08 PM
 */



const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#FFEBF0",
        height: "100vh",
    },
    clickable: {
        cursor: "pointer",
        userSelect: "none",
    },
}));


const AttendExam = () => {

    const classes = useStyles();

    useEffect(() => {
        console.log(" attend exam page :");
    }, []);

    return (
        <Box className={classes.root}>
            <Container>
                <Box component={Grid} container justify={"center"} alignItems={"center"} height={'100vh'}>
                    <Grid item xs={12} sm={12} md={6} justify={"center"} alignItems={"center"}>
                        <TimerCard/>
                        <QuestionCard/>
                        <Box m={4}/>
                        <ExamActions/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} justify={"center"} alignItems={"center"}>
                        r
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default AttendExam;
