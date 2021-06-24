import React, {useEffect} from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import OptionCard from "./option_card";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description question_card.js
 * @createdOn 24/06/21 9:42 am
 */




const QuestionCard = () => {
    const options = ['I fucking dont know', "I think i know", "May be i know", "Yeah boi I know"];
    useEffect(() => {
        console.log(" attend exam page :");
    }, []);

    return (
        <Box display={'flex'} alignItems={'flex-start'} justifyContent={'center'} flexDirection={'column'}
             bgcolor={'#ffffff'} p={3} mt={5}
             borderRadius={3}>
            <Typography variant="h3">
                Q1 : Do you know how a rocket engine works ?
            </Typography>
            <Box m={1} />
            {
                options.map((e) => {
                    return (
                        <OptionCard option={e}/>
                    )
                })
            }
        </Box>
    );
}
;

export default QuestionCard;
