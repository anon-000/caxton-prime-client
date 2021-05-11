import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const Loader = () => {

    return (
        <Box display="flex" height="100vh" alignItems="center" justifyContent="center">
            <CircularProgress size={90} thickness={2}/>
        </Box>
    );
};

export default Loader;