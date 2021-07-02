import React, {useEffect, useState} from "react";
import {CircularProgress, Container, Grid} from "@material-ui/core";
import TimerCard from "./components/timer_card";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import QuestionCard from "./components/question_card";
import ExamActions from "./components/exam_actions";
import QuestionStatus from "./components/questions_status";
import {getAllQuestions} from "../../../src/apis/exam_questions";
import {useSnackbar} from "notistack";
import {useRouter} from "next/router";
import EmptyErrorComponent from "../../../src/components/EmptyErrorComponent";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 13/06/21 10:08 PM
 */


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#fcf8f8",
        minHeight: "100vh",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    clickable: {
        cursor: "pointer",
        userSelect: "none",
    },
}));


const AttendExam = () => {
        const [selectedIndex, setCurrent] = useState(0);
        const [timerText, setTimerText] = useState('0d : 0h : 0m : 0s');
        const classes = useStyles();
        // const questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
        const [questionLoading, setQuestionLoading] = useState(true);
        const [questions, setQuestions] = useState(null);
        const {enqueueSnackbar} = useSnackbar();
        const Router = useRouter();
        const {id} = Router.query;

        useEffect(() => {
            console.log(" attend exam page :");
            setQuestionLoading(true);

            getAllQuestions(id).then((res) => {
                console.log(res);
                let _allQuestions = res.map(each => {
                    /// type 1- not visited , 2 - skipped , 3 - answered
                    return {
                        type: 1,
                        myAnswer: '',
                        ...each,
                    };
                });

                setQuestions(_allQuestions);
                let countDownDate = new Date("July 4, 2021 15:37:25").getTime();

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
                    setTimerText(hours + "h : "
                        + minutes + "m : " + seconds + "s ");
                    // If the count down is finished, write some text
                    if (distance < 0) {
                        clearInterval(x);
                        setTimerText('00:00:00');
                    }
                }, 1000);

            }).catch((error) => {
                enqueueSnackbar(error.message ? error.message : 'Something went wrong!', {variant: 'error'});

            }).finally(() => {
                setQuestionLoading(false);
            });


        }, []);


        const handlePreviousClick = () => {
            if (selectedIndex > 0) {
                setCurrent(selectedIndex - 1);
                updateQuestionType(2);
            }
        }

        const handleNextClick = () => {
            if (selectedIndex < questions.length - 1) {
                setCurrent(selectedIndex + 1);
                updateQuestionType(2);
            }
        }

        const jumpToIndex = (i) => {
            setCurrent(i);
            updateQuestionType(2);
        }

        const onErrorClick = () => {
            Router.replace('/student-exams');
        }

        const updateQuestionType = (val) => {
            let _temp = questions;
            questions[selectedIndex].type = val;
            console.log(_temp[selectedIndex]);
            // setQuestions(_temp);
        }

        const questionCardInitialized = () => {
            updateQuestionType(2);
        }


        return (
            <div className={classes.root}>
                <Container>
                    {
                        questionLoading ? <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                <CircularProgress size={64}/>
                            </Box> :
                            questions.length === 0 || !questions ?
                                <EmptyErrorComponent txt={!questions ? 'Some error occurred' : 'No Questions Found'}
                                                     btnText={'Back to All Exams Page'}
                                                     onClick={onErrorClick}/> :
                                <Box component={Grid} spacing={3} container justify={"center"} alignItems={"center"}
                                     height={'100%'}>
                                    <Grid item xs={12} sm={12} md={7}>
                                        <Box display={'flex'}>
                                            <TimerCard title={timerText}/>
                                        </Box>
                                        <QuestionCard question={questions[selectedIndex]} index={selectedIndex}
                                                      initQuestionCard={questionCardInitialized}/>
                                        <Box m={4}/>
                                        <ExamActions previousClick={handlePreviousClick} nextClick={handleNextClick}/>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={5}>
                                        <QuestionStatus questions={questions} currentIndex={selectedIndex}
                                                        onChanged={jumpToIndex}/>
                                    </Grid>
                                </Box>
                    }
                </Container>
            </div>
        );
    }
;

AttendExam.Layout = null;
export default AttendExam;
