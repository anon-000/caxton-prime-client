import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Button, Divider, Grid} from "@material-ui/core";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description questions_status.js
 * @createdOn 24/06/21 9:43 am
 */



const QuestionStatus = () => {

    const questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 12, 13, 14, 15, 16, 17, 18, 19, 20, 12, 13, 14, 15, 16, 17, 18, 19, 20, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    return (
        <Box display={'flex'} alignItems={'flex-end'} justifyContent={'center'} flexDirection={'column'}
             bgcolor={'#ffffff'} p={2}>
            <Typography align={'right'} variant="subtitle1">
                No. of Questions : 50
            </Typography>
            <Box m={1}/>
            <Box component={Divider} color={'#DDDDDD'} width={'100%'}/>
            <Box component={Grid} container p={1} height={500} overflow="auto" flex={1} flexDirection="column"
                 display="flex">
                {
                    questions.map((e) => {
                        return (
                            <Box component={Grid} display={'flex'} justify={"center"} alignItems={"center"} item xs={4}
                                 sm={4} md={3}>
                                <Box
                                    mx={1} p={3}
                                    bgcolor={'#F5FFCC'} borderRadius={1}
                                    textAlign={"center"}>
                                    Q : {e}
                                </Box>
                            </Box>
                        )
                    })
                }
            </Box>
            <Box m={1}/>
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

