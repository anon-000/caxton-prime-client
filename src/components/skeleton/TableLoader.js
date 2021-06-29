/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description TableLoader.js
 * @createdOn 29/06/21 3:16 pm
 */


import React from 'react';
import Box from '@material-ui/core/Box';
import {ScaleLoader} from 'react-spinners';
import theme from '../../theme';

const TableLoader = () => {

    return (
        <Box display="flex" p={9} alignItems="center" justifyContent="center">
            <ScaleLoader
                color={theme.palette.primary.main} loading={true} height={60} width={6} margin={3} radius={2}/>
        </Box>
    );
};

export default TableLoader;