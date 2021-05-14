import React from 'react'
import Box from "@material-ui/core/Box";


/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description role_selection
 * @createdOn 14/05/21 20:41
 */

const RoleCard = ({name, isActive}) => {
    return (
        <Box>
            Student
        </Box>
    )
}


const RoleSelection = ({type}) => {
    return (
        <>
            <RoleCard name={'Student'} isActive={type === 1}/>
            <RoleCard name={'Student'} isActive={type === 2}/>
        </>
    )
}


export default RoleSelection