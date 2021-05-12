import {
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Hidden,
    IconButton,
    InputAdornment,
    TextField
} from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {useStore} from 'laco-react';
import userStore from '../../src/store/userStore.js';
import {authenticate} from '../../src/apis/authentication.js';
import {useSnackbar} from 'notistack';
import {useRouter} from 'next/router';
import {makeStyles} from "@material-ui/core/styles";
import CoverImage from "../../src/asset/background.png"
import Vector from "../../src/asset/login_vector.svg"
import logo from "../../src/asset/logo.svg"
import textLogo from "../../src/asset/text_logo.svg"
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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
    create: {
        cursor: 'pointer',
        userSelect: 'none',
    }

}));


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const Router = useRouter();
    const {user} = useStore(userStore);
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);


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
                userStore.set(() => ({token: accessToken, user}), 'login');
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

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);


    return (

        <Box className={classes.root}>
            <Container maxWidth={'lg'}>
                <Grid container justify={'center'} alignItems={'center'} height={'80vh'}
                      component={Box} boxShadow={3} borderRadius={6} bgcolor={'background.default'}>
                    <Hidden smDown>
                        <Grid xs={12} sm={12} md={7} item container justify={'center'} alignItems={'center'}>
                            <img src={Vector} alt={'login'}/>
                        </Grid>
                    </Hidden>
                    <Grid xs={12} sm={12} md={5} item container justify={'center'} alignItems={'center'}>
                        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} width={'100%'} p={4}
                             alignItems={'center'} height={'100%'}>
                            <img src={logo} alt={'login'}/>
                            <Box m={1}/>
                            <img src={textLogo} alt={'login'}/>
                            <Box m={2}/>
                            <TextField
                                fullWidth
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                variant="outlined"
                                placeholder={'Email'}
                            />
                            <Box m={0.6}/>
                            <TextField
                                style={{backgroundColor: '#EEF0F5', height: 55, borderRadius: 6}}
                                fullWidth
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                variant="outlined"
                                placeholder={'Password'}
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Box m={1}/>
                            <Button fullWidth disabled={loading} onClick={() => handleLogin()} color="primary"
                                    variant="contained">
                                {loading ? <CircularProgress
                                    size={24}
                                /> : 'Login'}
                            </Button>
                            <Box m={2}/>
                            <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
                                <Box variant={'body2'} component={Typography}>
                                    Don’t have an account ?
                                </Box>
                                <Box m={0.2}/>
                                <Box variant={'body1'} component={Typography} color={'primary.main'}
                                     className={classes.create}>
                                    Create
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

        </Box>
    )
}

export default Login
