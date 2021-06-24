import React, {useEffect} from "react";
import Box from "@material-ui/core/Box";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description option_card.js
 * @createdOn 24/06/21 12:07 pm
 */






const OptionCard = ({option}) => {
    useEffect(() => {
        console.log(" attend exam page :");
    }, []);

    return (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} width={'100%'} borderRadius={'50%'}>
            <Box
                mr={1}
                bgcolor={"#F03D5F"}
                height={14}
                width={14}
                p={1}
                borderRadius={"50%"}
            />
            <Box
                bgcolor={'#EEF0F5'} px={2} py={1.5} m={1} width={'100%'}
                borderRadius={3}>
                {option}
            </Box>
        </Box>
    );
};

export default OptionCard;
