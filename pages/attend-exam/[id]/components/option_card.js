import React from "react";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description option_card.js
 * @createdOn 24/06/21 12:07 pm
 */


const useStyles = makeStyles((theme) => ({
    clickable: {
        cursor: "pointer",
        userSelect: "none",
    },
}));


const OptionCard = ({option, isSelected, onClick}) => {
    const classes = useStyles();

    return (
        <Box data-aos="zoom-in"
             data-aos-duration="400" onClick={onClick} className={classes.clickable} display={'flex'}
             alignItems={'center'}
             justifyContent={'center'}
             width={'100%'} borderRadius={'50%'}>
            <Box
                mr={1}
                bgcolor={isSelected ? "#F03D5F" : "#ffffff"}
                borderColor={isSelected ? "#F03D5F" : '#8F8F8F'} border={1}
                height={14}
                width={14}
                p={1}
                borderRadius={"50%"}
            />
            <Box
                bgcolor={isSelected ? "#F03D5F" : '#EEF0F5'}
                color={isSelected ? "#ffffff" : '#373737'}
                fontWeight={600}
                px={2} py={1.5} m={1} width={'100%'}
                borderRadius={3}>
                {option}
            </Box>
        </Box>
    );
};

export default OptionCard;
