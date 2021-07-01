import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Button, Divider, Grid} from "@material-ui/core";
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


const QuestionStatus = ({currentIndex, onChanged, questions}) => {

    const classes = useStyles();

    return (
        <Box display={'flex'}
             alignItems={'flex-end'} justifyContent={'center'} flexDirection={'column'}
             boxShadow={'2px 2px 6px rgba(18, 73, 84, 0.15)'}
             bgcolor={'#ffffff'} p={2}>
            <Typography align={'right'} variant="subtitle1">
                No. of Questions : 50
            </Typography>
            <Box m={1}/>
            <Box component={Divider} color={'#DDDDDD'} width={'100%'}/>
            <Box component={Grid} container p={1}
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
                                    bgcolor={currentIndex === i ? '#F03D5F' : '#F5FFCC'}
                                    borderRadius={1}
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
                    <QuestionType color={"#EBF4FF"} text={'Not visited : 12'}/>
                    <QuestionType color={"#F03D5F"} text={'Current'}/>
                </Grid>
                <Grid item md={6} xs={6} sm={6}>
                    <QuestionType color={"#FFEEF2"} text={'Skipped : 5'}/>
                    <QuestionType color={"#F5FFCC"} text={'Answered : 12'}/>
                </Grid>
            </Grid>
            <Box m={0.5}/>
            <Button
                fullWidth
                // disabled={loading}
                onClick={() => {
                }}
                color="primary"
                variant="contained"
            >
                Submit
            </Button>
        </Box>
    );
};

export default QuestionStatus;







