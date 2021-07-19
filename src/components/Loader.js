import React from 'react';
import Box from '@material-ui/core/Box';

import {PacmanLoader} from "react-spinners";
import makeStyles from "@material-ui/core/styles/makeStyles";
import particleConfig from "../config/particlesjs-config.json";
import Particles from "react-particles-js";

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
        top: '46%',
        left: '45%',
    }
}))
const Loader = () => {
    const classes = useStyles();

    return (
        // <Box style={{position: 'relative'}} display="flex" height="100vh"  width="100%" alignItems="center" justifyContent="center">
        //     <Particles
        //         params={particleConfig}
        //         style={{zIndex:  -1}}
        //     />
        //     <Box  className={classes.container}>
        //         <PacmanLoader color={'#B9223F'} size={50}/>
        //     </Box>
        // </Box>
        <>
            <Box style={{position: 'relative'}} height={'100vh'} width={'100%'}>
                <Particles
                    params={particleConfig}
                    style={{zIndex: -1}}
                />
                <Box className={classes.container}>
                    <PacmanLoader className={classes.container} color={'#B9223F'} size={50}/>
                </Box>
            </Box>
        </>
    );
};

export default Loader;