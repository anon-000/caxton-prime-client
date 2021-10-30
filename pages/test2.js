import { AppBar, Box, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React from 'react';
import BackImg from '../public/Vector 34 (6).svg';

const useStyles = makeStyles({
    container: {
        backgroundImage: `url(${BackImg})`,
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%'
    }
});

const Test = () => {

    const classes = useStyles();

    return (
        <Box className={classes.container} height={'100vh'} width={'100%'}>
            <AppBar component={Box} bgColor={'transparent'} position={'static'}> 
                <Toolbar>
                    <Typography variant={'h3'}>
                        {'IMCA BANK'}
                    </Typography>
                    <Box flex={1} ></Box>
                    <Box display={'flex'}>
                        <Typography color={'primary'} variant={'body2'}>
                            {'Home'}
                        </Typography>
                        <Typography color={'primary'} variant={'body2'}>
                            {'contact us'}
                        </Typography>
                        <Typography color={'primary'} variant={'body2'}>
                            {'abuut'}
                        </Typography>
                        <Typography color={'primary'} variant={'body2'}>
                            {'gallery'}
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Test
