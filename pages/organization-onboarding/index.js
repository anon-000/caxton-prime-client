import {
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Hidden,
    TextField
} from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {useStore} from 'laco-react';
import userStore from '../../src/store/userStore.js';
import {useSnackbar} from 'notistack';
import {useRouter} from 'next/router';
import {makeStyles} from "@material-ui/core/styles";
import CoverImage from "../../src/asset/background.png"
import Vector from "../../src/asset/organization_onboarding_vector.svg"
import Typography from "@material-ui/core/Typography";
import {userPatch} from "../../src/apis/users";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 12/05/21 11:53
 */


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${CoverImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('lg')]: {
            padding: '0px 120px'
        },
        [theme.breakpoints.down('md')]: {
            padding: '0px 80px'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '0px 60px'
        },
        [theme.breakpoints.down('xs')]: {
            padding: '0px 8px'
        },

    },
}));


const OrganizationOnBoarding = () => {

    const [phone, setPhone] = useState('');
    const [lane, setLane] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const Router = useRouter();
    const {user} = useStore(userStore);
    const classes = useStyles();


    useEffect(() => {
        console.log("organization on-boarding page");
    }, []);

    const handleOrganizationRequest = () => {
        if (phone === '') {
            enqueueSnackbar('Phone number is required', {variant: 'warning'});
            return;
        } else if (lane === '') {
            enqueueSnackbar('Lane is required', {variant: 'warning'});
            return;
        } else if (city === '') {
            enqueueSnackbar('City is required', {variant: 'warning'});
            return;
        } else if (state === '') {
            enqueueSnackbar('State is required', {variant: 'warning'});
            return;
        } else if (pin === '') {
            enqueueSnackbar('Pin is required', {variant: 'warning'});
            return;
        }

        setLoading(true);
        userPatch(user['_id'], {
            phone, "address": {
                lane,
                city,
                state,
                "pinCode": pin,
            }
        })
            .then((response) => {
                userStore.set(() => ({response}), 'user');
                Router.replace('/');
            })
            .catch(error => {
                enqueueSnackbar(error.message && error.message ? error.message : 'Something went wrong!', {variant: 'warning'});
            }).finally(() => {
            setLoading(false);
        });
    };


    return (

        <Box className={classes.root}>
            <Container maxWidth={'lg'}>
                <Grid container justify={'center'} alignItems={'center'} height={'80vh'}
                      component={Box} boxShadow={3} borderRadius={6} bgcolor={'background.default'}>
                    <Hidden smDown>
                        <Grid xs={12} sm={12} md={7} item container justify={'center'} alignItems={'center'}>
                            <img src={Vector} alt={'login'} width={'60%'}/>
                        </Grid>
                    </Hidden>
                    <Grid xs={12} sm={12} md={5} item container justify={'center'} alignItems={'center'}>
                        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} width={'100%'} p={4}
                             alignItems={'flex-start'} height={'100%'}>
                            <Typography variant={'h3'}>
                                Contact Details
                            </Typography>
                            <Box m={1.5}/>
                            <TextField
                                fullWidth
                                value={phone}
                                onChange={event => setPhone(event.target.value)}
                                variant="outlined"
                                placeholder={'Phone number'}
                            />
                            <Box m={1}/>
                            <Box component={Typography} variant={'caption'} color={'#757575'}>
                                Address
                            </Box>
                            <Box m={0.6}/>
                            <TextField
                                fullWidth
                                value={lane}
                                onChange={event => setLane(event.target.value)}
                                variant="outlined"
                                placeholder={'Lane'}
                            />
                            <Box m={0.6}/>
                            <TextField
                                fullWidth
                                value={city}
                                onChange={event => setCity(event.target.value)}
                                variant="outlined"
                                placeholder={'City'}
                            />
                            <Box m={0.6}/>
                            <TextField
                                fullWidth
                                value={state}
                                onChange={event => setState(event.target.value)}
                                variant="outlined"
                                placeholder={'State'}
                            />
                            <Box m={0.6}/>
                            <TextField
                                fullWidth
                                value={pin}
                                onChange={event => setPin(event.target.value)}
                                variant="outlined"
                                placeholder={'Pin'}
                            />
                            <Box m={1}/>
                            <Button fullWidth disabled={loading} onClick={handleOrganizationRequest} color="primary"
                                    variant="contained">
                                {loading ? <CircularProgress
                                    size={24}
                                /> : 'Send Request'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

        </Box>
    )
}

export default OrganizationOnBoarding
