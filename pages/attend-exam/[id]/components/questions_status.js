import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Button, CircularProgress, Divider, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description questions_status.js
 * @createdOn 24/06/21 9:43 am
 */


const useStyles = makeStyles((theme) => ({
    clickable: {
        cursor: "pointer",
        userSelect: "none",
    },
}));


const QuestionType = ({color, text}) => {
    return (
        <Box display={'flex'} my={1} ml={5}>
            <Box bgcolor={color} borderRadius={5} height={20} width={20} mr={1}/>
            <Typography variant="subtitle">
                {text}
            </Typography>
        </Box>
    );
}


const QuestionStatus = ({currentIndex, onChanged, questions, onSubmit, isLoading}) => {


    const [notVisited, setNotVisited] = useState(0);
    const [answered, setAnswered] = useState(0);
    const [skipped, setSkipped] = useState(0);


    const classes = useStyles();

    useEffect(() => {
        setNotVisited(0);
        setAnswered(0);
        setSkipped(0);
        //console.log(questions);
        let nv = 0, sk = 0, ans = 0;
        questions.forEach((e) => {
            if (e.type === 1) {
                /// not visited
                nv += 1;
            } else if (e.type === 2) {
                /// skipped
                sk += 1;
            } else if (e.type === 3) {
                /// answered
                ans += 1;
            }
        });
        setNotVisited(nv);
        setSkipped(sk);
        setAnswered(ans);
    }, [currentIndex, questions]);


    return (
        <Box display={'flex'}
             alignItems={'flex-end'} justifyContent={'center'} flexDirection={'column'}
             boxShadow={'2px 2px 6px rgba(18, 73, 84, 0.15)'}
             bgcolor={'#ffffff'} p={2}>
            <Typography align={'right'} variant="subtitle1">
                No. of Questions : {questions.length}
            </Typography>
            <Box m={1}/>
            <Box component={Divider} color={'#DDDDDD'} width={'100%'}/>
            <Box component={Grid} container p={1} spacing={0}
                 height={450} overflow="auto" alignItems={'flex-start'}
            >
                {
                    questions.map((e, i) => {

                        return (
                            <Box component={Grid}
                                 display={'flex'} justify={"center"} alignItems={"center"}
                                 item xs={4} sm={4} md={3}>
                                <Box
                                    onClick={() => onChanged(i)} className={classes.clickable}
                                    m={1} p={3}
                                    fontWeight={600}
                                    color={currentIndex === i ? '#ffffff' : '#000000'}
                                    bgcolor={currentIndex === i ? '#F03D5F' :
                                        e.type === 2 ? '#FFEEF2' :
                                            e.type === 3 ? '#F5FFCC' : '#EBF4FF'}
                                    borderRadius={4}
                                    textAlign={"center"}>
                                    Q : {i + 1}
                                </Box>
                            </Box>
                        )
                    })
                }
            </Box>
            <Box component={Divider} color={'#DDDDDD'} width={'100%'}/>
            <Box m={0.5}/>
            <Grid container>
                <Grid item md={6} xs={6} sm={6}>
                    <QuestionType color={"#EBF4FF"} text={`Not visited : ${notVisited}`}/>
                    <QuestionType color={"#F03D5F"} text={'Current'}/>
                </Grid>
                <Grid item md={6} xs={6} sm={6}>
                    <QuestionType color={"#FFEEF2"} text={`Skipped : ${skipped}`}/>
                    <QuestionType color={"#F5FFCC"} text={`Answered : ${answered}`}/>
                </Grid>
            </Grid>
            <Box m={0.5}/>
            <Button
                fullWidth
                disabled={isLoading}
                onClick={onSubmit}
                color="primary"
                variant="contained"
            >
                {isLoading ? <CircularProgress size={24}/> : "Submit"}
            </Button>
        </Box>
    );
};

export default QuestionStatus;






