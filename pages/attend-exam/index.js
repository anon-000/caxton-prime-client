import React, {useEffect, useState} from "react";
import {Container, Grid} from "@material-ui/core";
import TimerCard from "./components/timer_card";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import QuestionCard from "./components/question_card";
import ExamActions from "./components/exam_actions";
import QuestionStatus from "./components/questions_status";

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
        backgroundSize: "cover",
    },
    clickable: {
        cursor: "pointer",
        userSelect: "none",
    },
}));


const AttendExam = () => {
    const [selectedIndex, setCurrent] = useState(0);
    const [timerText, setTimerText] = useState('');
    const classes = useStyles();
    const questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    useEffect(() => {
        console.log(" attend exam page :");
        let countDownDate = new Date("Jun 30, 2021 15:37:25").getTime();

        let x = setInterval(function () {

            // Get today's date and time
            let now = new Date().getTime();

            // Find the distance between now and the count down date
            let distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            setTimerText(days + "d " + hours + "h "
                + minutes + "m " + seconds + "s ");

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                setTimerText('00:00:00');
            }
        }, 1000);
    }, []);


    const handlePreviousClick = () => {
        if (selectedIndex > 0) {
            setCurrent(selectedIndex - 1);
        }
    }

    const handleNextClick = () => {
        if (selectedIndex < questions.length - 1) {
            setCurrent(selectedIndex + 1);
        }
    }

    const jumpToIndex = (i) => {
        setCurrent(i);
    }


    return (
        <div className={classes.root}>
            <Container>
                <Box component={Grid} spacing={3} container justify={"center"} alignItems={"center"} height={'100vh'}>
                    <Grid item xs={12} sm={12} md={7} justify={"center"} alignItems={"center"}>
                        <Box display={'flex'}>
                            <TimerCard title={timerText}/>
                        </Box>
                        <QuestionCard index={selectedIndex}/>
                        <Box m={4}/>
                        <ExamActions previousClick={handlePreviousClick} nextClick={handleNextClick}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} justify={"center"} alignItems={"center"}>
                        <QuestionStatus questions={questions} currentIndex={selectedIndex} onChanged={jumpToIndex}/>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
};

export default AttendExam;
