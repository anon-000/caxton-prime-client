import React, {useEffect} from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import timer from "../../../src/asset/timer.svg";


/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description timer_card.js
 * @createdOn 24/06/21 9:43 am
 */




const TimerCard = () => {
    useEffect(() => {
        console.log(" attend exam page :");
    }, []);

    return (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} bgcolor={'#ffffff'} p={2} mt={2}
             borderRadius={3} width={'220px'}>
            <img src={timer} alt={'timer'}/>
            <Box m={0.5}/>
            <Typography variant="h5">
                01:03:10
            </Typography>
        </Box>
    );
};

export default TimerCard;
