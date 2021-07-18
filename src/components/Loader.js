import React from 'react';
import Box from '@material-ui/core/Box';

import {PacmanLoader} from "react-spinners";

const Loader = () => {

    return (
        <Box display="flex" height="100vh" alignItems="center" justifyContent="center">
            <Box mr={28} mb={12}>
                <PacmanLoader color={'#B9223F'} size={50}/>
            </Box>
        </Box>
    );
};

export default Loader;