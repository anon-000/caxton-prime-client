import {makeStyles} from "@material-ui/core/styles";
import {useRouter} from "next/router";
import Grid from "@material-ui/core/Grid";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {getExamDetails} from "../../../src/apis/exams";
import {Box, CircularProgress, Container} from "@material-ui/core";
import {getAllQuestions} from "../../../src/apis/exam_questions";
import AddQuestionCard from "./components/add_question_card";

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
}));

const DraftDetails = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [canAttend, setCanAttend] = useState(false);
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
            const questions = await getAllQuestions(id);
            setQuestions(questions);
            setExamLoading(false);
        } catch (error) {
            enqueueSnackbar(error.message ? error.message : 'Something went wrong!', {variant: 'error'});
            setExamLoading(false);
        }
    }, []);


    return (
        <Container>
            <Grid container>
                {
                    examLoading ? <Box display={'flex'} justifyContent={'center'} alignItems={'center'} width={'50%'}>
                        <CircularProgress size={64}/>
                    </Box> : <Grid item xs={12} sm={12} md={7}>
                        {examData.title}
                    </Grid>
                }
                <Grid item xs={12} sm={12} md={5}>
                    <AddQuestionCard/>
                </Grid>
            </Grid>
        </Container>
    )
}


export default DraftDetails
