import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import timer from "../../../../src/asset/timer.svg";


/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description timer_card.js
 * @createdOn 24/06/21 9:43 am
 */


const TimerCard = ({date}) => {

    const [timerText, setTimerText] = useState('0d : 0h : 0m : 0s');

    let countDownDate = new Date(date).getTime();

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


    useEffect(() => {
        console.log(" attend exam page :");
    }, []);

    return (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}
             boxShadow={'2px 2px 6px rgba(18, 73, 84, 0.15)'}
             bgcolor={'#ffffff'} p={2} mt={3}
             borderRadius={3}>
            <img src={timer} alt={'timer'} height={40}/>
            <Box m={0.5}/>
            <Typography variant="h6">
                {timerText}
            </Typography>
        </Box>
    );
};

export default TimerCard;
