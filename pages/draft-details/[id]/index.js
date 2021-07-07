import {makeStyles} from "@material-ui/core/styles";
import {useRouter} from "next/router";
import Grid from "@material-ui/core/Grid";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {getExamDetails} from "../../../src/apis/exams";
import {Box, CircularProgress, Container, Typography} from "@material-ui/core";
import {getAllQuestions} from "../../../src/apis/exam_questions";
import AddQuestionCard from "./components/add_question_card";
import OrganQuestionCard from "./components/organ_question_card";
import Hidden from "@material-ui/core/Hidden";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 04/07/21 5:22 am
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
    leftPanel: {
        marginTop: '28px',
        '@media (max-width:1050px)': {
            fontSize: 17,
        },
        '@media (max-width:900px)': {
            fontSize: 16,
            lineHeight: '15px',
        },
        '@media (max-width:500px)': {
            fontSize: 15,
            lineHeight: '15px',
        },
    }
}));

const DraftDetails = () => {
    const classes = useStyles();
    const [questionLoading, setQuestionLoading] = useState(false);
    const [examLoading, setExamLoading] = useState(true);
    const [examData, setExamData] = useState(null);
    const [questions, setQuestions] = useState(null);
    const {enqueueSnackbar} = useSnackbar();
    const Router = useRouter();
    const {id} = Router.query;

    const colors = ["#0EA81D", "#FF0000", "#848708", "#4D59C2", "#FF00B8"];
    useEffect(async () => {
        console.log("draft details page :");
        try {
            setExamLoading(true);
            const examDetails = await getExamDetails(id);
            setExamData(examDetails);
            setExamLoading(false);
        } catch (error) {
            enqueueSnackbar(error.message ? error.message : 'Something went wrong!', {variant: 'error'});
            setExamLoading(false);
        }
    }, []);


    useEffect(async () => {
        try {
            setQuestionLoading(true);
            const temp = await getAllQuestions(id);
            setQuestions(temp);
            setQuestionLoading(false);
        } catch (error) {
            enqueueSnackbar(error.message ? error.message : 'Something went wrong!', {variant: 'error'});
            setQuestionLoading(false);
        }
    }, []);


    const onNewQuestionAdd = (datum) => {
        setQuestions([datum, ...questions]);
    }


    return (
        <Container maxWidth={'xl'}>
            <Grid container>
                <Grid item xs={12} sm={12} md={7}>
                    {
                        examLoading ?
                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
                                <CircularProgress size={64}/>
                            </Box> : <Box px={3} className={classes.leftPanel}>
                                <Typography variant="h1">{examData.title}</Typography>
                                <Box m={1}/>
                                <Box display={"flex"} flexWrap={'wrap'}>
                                    {examData.examTags.map((e, i) => (
                                        <Box
                                            fontSize={12}
                                            fontWeight={"bold"}
                                            color={"#ffffff"}
                                            bgcolor={colors[i % 5]}
                                            borderRadius={5}
                                            px={2}
                                            py={0.6}
                                            mx={i === 0 ? 0 : 1}
                                            mr={i === 0 ? 0 : 0}
                                            mt={1}
                                        >
                                            {e.name}
                                        </Box>
                                    ))}
                                </Box>
                                <Box m={1.5}/>
                                <Typography variant="body2">
                                    {examData.description}
                                </Typography>
                                <Box m={2}/>
                                <Hidden mdUp>
                                    <AddQuestionCard onNewQuestion={onNewQuestionAdd} examId={id}/>
                                </Hidden>
                                <Box
                                    component={Typography}
                                    variant="subtitle2"
                                    borderBottom={2}
                                    maxWidth={160}
                                >
                                    All Questions
                                </Box>
                                {questionLoading ?
                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'300px'}>
                                        <CircularProgress size={64}/>
                                    </Box> : questions.map((e, i) => (
                                        <OrganQuestionCard question={e} index={i}/>
                                    ))}
                                <Box m={6}/>
                            </Box>
                    }
                </Grid>
                <Box component={Grid} width={'100%'} height={'100%'} citem xs={12} sm={12} md={5}>
                    <Hidden smDown>
                        <AddQuestionCard onNewQuestion={onNewQuestionAdd} examId={id}/>
                    </Hidden>
                </Box>
            </Grid>
        </Container>
    )
}

export default DraftDetails