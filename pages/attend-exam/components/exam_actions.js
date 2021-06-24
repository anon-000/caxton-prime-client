import React from "react";
import Box from "@material-ui/core/Box";
import {Button} from "@material-ui/core";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description exam_actions.js
 * @createdOn 24/06/21 9:43 am
 */



const ExamActions = () => {

    return (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Box
                component={Button}
                bgcolor={'#ffffff'}
                fullWidth
                // disabled={loading}
                onClick={() => {
                }}
                variant="outlined"
                color="#3F3D56"
            >
                Previous
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
                Next
            </Button>
        </Box>
    );
};

export default ExamActions;
