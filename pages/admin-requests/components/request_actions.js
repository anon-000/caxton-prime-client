/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description request_actions.js
 * @createdOn 08/07/21 4:33 pm
 */


import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import React from "react";

const RequestActions = ({onReject, onAccept}) => {
    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} my={2}>
            <Button color="primary" onClick={onReject} variant={'outlined'}
                    style={{fontWeight: '600', textTransform: 'none', width: '130px', height: '50px'}}>
                {"Reject"}
            </Button>
            <Box m={1} />
            <Button color="primary" onClick={onAccept} variant={'contained'}
                    style={{fontWeight: '600', textTransform: 'none', width: '130px', height: '50px'}}>
                {"Accept"}
            </Button>
        </Box>
    )
}


export default RequestActions