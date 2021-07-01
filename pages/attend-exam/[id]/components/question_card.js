import React, {useEffect, useState} from "react";
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


const QuestionCard = ({question, index}) => {
        const options = ['I dont know', "I think i know", "May be i know", "Yeah boi I know"];
        const [selectedIndex, setCurrent] = useState();


        useEffect(() => {
            console.log(" question card rendered ::::::::");
        }, []);

        return (
            <Box display={'flex'} alignItems={'flex-start'} justifyContent={'center'} flexDirection={'column'}
                 boxShadow={'2px 2px 6px rgba(18, 73, 84, 0.15)'}
                 bgcolor={'#ffffff'} p={3} mt={5}
                 borderRadius={3}>
                <Typography variant="h3">
                    Q{index + 1} : {question.question}
                </Typography>
                <Box m={1}/>
                {
                    question.options.map((e, i) => {
                        return (
                            <OptionCard
                                option={e}
                                isSelected={i === selectedIndex}
                                onClick={() => setCurrent(i)}
                            />
                        )
                    })
                }
            </Box>
        );
    }
;

export default QuestionCard;
