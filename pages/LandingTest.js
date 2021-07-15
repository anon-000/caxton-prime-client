import React from 'react';
import HomeAppbar from "../src/layout/HomeAppbar";
import {Box, Container, Hidden, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Image1 from '../public/Group 546.svg';
import BgVector from '../public/back.svg';
import OurServices from "../src/components/homePageComponets/OurServices";
import AboutUs from "../src/components/homePageComponets/AboutUs";
import Footer from "../src/layout/Footer";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundImage: `url${BgVector}`
    }
}))

const LandingTest = () => {

    const classes = useStyles();

    return (
        <>
            <HomeAppbar />
            <Box className={classes.container} width={'100%'} height={'100vh'}
                 px={{xs: 0, sm: 2, md: 7}}
            >
                <Container
                    component={Box}
                    maxWidth={'xl'}
                    height={'100%'}
                >
                    <Box
                        height={'100%'}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        flexDirection={{xs: 'column', sm: 'row'}}
                    >
                        <Box width={{xs: '100%', sm: '50%' }}>
                            <Box my={{xs: 3, md: 0}}>
                                <Hidden smDown>
                                    <Typography style={{fontSize : '60px', fontWeight: '900', color: '#3F3D56'}} variant={'h2'}>
                                        {'BUILD YOUR'}
                                        <br />
                                        {'CAREER WITH US'}
                                    </Typography>
                                </Hidden>
                                <Hidden mdUp>
                                    <Typography style={{fontSize : '40px', fontWeight: '900', color: '#3F3D56'}} variant={'h2'}>
                                        {'BUILD YOUR'}
                                        <br />
                                        {'CAREER WITH US'}
                                    </Typography>
                                </Hidden>
                            </Box>
                            <Box>
                                <Typography style={{color : '#515151', fontWeight: 200}} variant={"subtitle2"}>
                                    {'Lorem ipsum dolor sit amet, consectetur'}
                                    <br />
                                    {'adipiscing elit. Nam efficitur est ac '}
                                    <br />
                                    {'pretium ullamcorper. Sed sagittis, lorem'}
                                    <br />
                                    {' a semper convallis, ex nisl '}
                                </Typography>
                            </Box>
                        </Box>
                        <Hidden smDown>
                            <Box width={{xs: '100%', sm: '50%' }}>
                                <img src={Image1} width={'90%'} alt={'Image 1'} />
                            </Box>
                        </Hidden>
                        <Hidden mdUp>
                            <Box width={{xs: '100%', sm: '50%' }}>
                                <img src={Image1} width={'300px'} alt={'Image 1'} />
                            </Box>
                        </Hidden>
                    </Box>
                </Container>
            </Box>
            <Box my={3} />
            <OurServices />
            <Box my={3} />
            <Box
                px={{xs: 2, sm: 2, md: 7}}
                width={'100%'}
            >
                <AboutUs />
            </Box>
            <Box my={3} />
            <Footer />
        </>
    );
};

export default LandingTest;

LandingTest.Layout = null;