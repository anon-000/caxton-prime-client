import {Box, Button, Card, CircularProgress, Container, Grid, Hidden, TextField} from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {useStore} from 'laco-react';
import UserStore from '../../src/store/UserStore';
import {authenticate} from '../../src/apis/authentication';
import {useSnackbar} from 'notistack';
import {useRouter} from 'next/router';
import {makeStyles} from "@material-ui/core/styles";
import CoverImage from "../../src/asset/background.png"
import Vector from "../../src/asset/login_vector.svg"


/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 12/05/21 11:53
 */


const useStyles = makeStyles(() => ({
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

        // padding: '0px 60px'
    }
}));


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const Router = useRouter();
    const {user} = useStore(UserStore);
    const classes = useStyles();

    useEffect(() => {
        console.log("login page");
        if (user) {
            Router.replace('/');
        }
    }, []);

    const handleLogin = () => {
        setLoading(true);
        authenticate(email, password)
            .then((response) => {
                const {accessToken, user} = response;
                console.log(accessToken, user);
                localStorage.setItem('feathers-jwt', accessToken);
                UserStore.set(() => ({token: accessToken, user}), 'login');
                enqueueSnackbar('Login successfully', {variant: 'success'});
                if (user.role === 2) {
                    Router.replace('/admin/dashboard');
                } else {
                    Router.replace('/accountDetails');
                }
            })
            .catch(error => {
                enqueueSnackbar(error.message && error.message ? error.message : 'Something went wrong!', {variant: 'warning'});
            }).finally(() => {
            setLoading(false);
        });
    };


    return (


        <Box className={classes.root}>
            <Box maxWidth={'lg'} component={Container}  mx={8}>
                <Grid container  justify={'center'} alignItems={'center'} height={'80vh'}
                      component={Box} boxShadow={3} borderRadius={6} bgcolor={'background.default'} >
                    <Hidden smDown>
                        <Grid xs={12} sm={12} md={7} item container justify={'center'} alignItems={'center'}>
                            <img src={Vector} alt={'login'}/>
                        </Grid>
                    </Hidden>
                    <Grid xs={12} sm={12} md={5} item container justify={'center'} alignItems={'center'}>
                        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}
                             alignItems={'center'} height={'500px'}>
                            <TextField
                                label={'Email'}
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                variant="outlined"
                            />
                            <TextField
                                label={'Password'}
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                variant="outlined"
                            />
                            <Button disabled={loading} onClick={() => handleLogin()} color="primary"
                                    variant="contained">
                                {loading ? <CircularProgress
                                    size={24}
                                /> : 'Login'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

        </Box>
    )
}

export default Login
