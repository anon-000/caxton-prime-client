import React from 'react'
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";


/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description role_selection
 * @createdOn 14/05/21 20:41
 */


const useStyles = makeStyles((theme) => ({
    withoutHover: {
        cursor: 'pointer',
        userSelect: 'none',
    },
    withHover: {
        cursor: 'pointer',
        userSelect: 'none',
        '&:hover': {backgroundColor: "rgba(243,243,243,0.5)"}
    }
}));


const RoleCard = ({name, isActive, onClick}) => {
    const classes = useStyles();

    return (
        <Box borderRadius={6} border={1.5} py={1} width={1}
             className={isActive ? classes.withoutHover : classes.withHover}
             bgcolor={isActive ? '#FBCBD7' : '#ffffff'} fontWeight={isActive ? '600' : '500'}
             color={isActive ? '#F03D5F' : '#6A6A6A'} display={'flex'} alignItems={'center'} justifyContent={'center'}
             onClick={onClick} borderColor={isActive ? '#F03D5F' : '#6A6A6A'}>
            {name}
        </Box>
    )
}


const RoleSelection = ({type, onChanged}) => {
    return (
        <Box display={'flex'} flexDirection={'row'} width={1}>
            <RoleCard name={'Student'} isActive={type === 1} onClick={() => onChanged(1)}/>
            <Box m={1}/>
            <RoleCard name={'Organization'} isActive={type === 2} onClick={() => onChanged(2)}/>
        </Box>
    )
}

export default RoleSelection