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
import {submitExamAnswer} from "../../../src/apis/results";
import {getExamDetails} from "../../../src/apis/exams";

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
        const [loading, setLoading] = useState(false);
        const classes = useStyles();
        // const questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
        const [questionLoading, setQuestionLoading] = useState(true);
        const [questions, setQuestions] = useState(null);
        const [exam, setExam] = useState(null);
        const {enqueueSnackbar} = useSnackbar();
        const Router = useRouter();
        const {id} = Router.query;

        useEffect(async () => {
            console.log(" attend exam page :");
            setQuestionLoading(true);


            try {
                const exRes = await getExamDetails(id);
                const res = await getAllQuestions(id);

                let _allQuestions = res.map((each, i) => {
                    /// type 1- not visited , 2 - skipped , 3 - answered
                    return {
                        type: i === 0 ? 2 : 1,
                        myAnswer: '',
                        ...each,
                    };
                });
                setQuestions(_allQuestions);

                let _exam = {
                    ...exRes,
                    timer: new Date(exRes.scheduledAt).setTime(new Date(exRes.scheduledAt).getTime() + 1000 * 60 * exRes.duration)
                };
                console.log(_exam);
                setExam(_exam);
                setQuestionLoading(false);
            } catch (error) {
                setQuestionLoading(false);
                enqueueSnackbar(error.message ? error.message : 'Something went wrong!', {variant: 'error'});
            }
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
            if (_temp[selectedIndex].type === 1 && val === 2) {
                _temp[selectedIndex].type = 2;
            } else if (_temp[selectedIndex].type === 2 && val === 3) {
                _temp[selectedIndex].type = 3;
            }
            setQuestions(_temp);
        }

        const answerAQuestion = (answer) => {
            let _tempNew = questions;
            _tempNew[selectedIndex].myAnswer = answer;
            _tempNew[selectedIndex].type = 3;
            setQuestions([..._tempNew]);
        }


        const submitAnswers = () => {
            let _myAnswers = [];
            setLoading(true);
            questions.forEach((e) => {
                if (e.myAnswer !== '') {
                    _myAnswers = [..._myAnswers, {
                        question: e._id,
                        choice: [e.myAnswer]
                    }];
                }
            });
            submitExamAnswer({
                exam: id,
                examTitle: exam.title,
                studentAnswer: _myAnswers,
            }).then((res) => {
                enqueueSnackbar("Answers submitted successfully", {variant: "success"});
                Router.replace('/submission-success');
            }).catch((error) => {
                enqueueSnackbar(error.message ? error.message : 'Something went wrong!', {variant: 'error'});
            }).finally(() => {
                setLoading(false);
            });
        }

        console.log(questions);


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
                                            <TimerCard date={exam.timer}/>
                                        </Box>
                                        <QuestionCard
                                            question={questions[selectedIndex]}
                                            index={selectedIndex}
                                            selectOption={answerAQuestion}
                                        />
                                        <Box m={4}/>
                                        <ExamActions previousClick={handlePreviousClick} nextClick={handleNextClick}/>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={5}>
                                        <QuestionStatus questions={questions}
                                                        isLoading={loading}
                                                        currentIndex={selectedIndex}
                                                        onSubmit={submitAnswers}
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
