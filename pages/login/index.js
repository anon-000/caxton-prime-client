import { Box, Button, CircularProgress, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useStore } from 'laco-react';
import UserStore from '../../src/store/UserStore';
import { authenticate } from '../../src/apis/authentication';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';


const Index = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const Router = useRouter();
    const { user } = useStore(UserStore);

    useEffect(() => {
        if (user) {
            Router.replace('/');
        }
    }, []);

    const handleLogin = () => {
        setLoading(true);
        authenticate(email, password)
            .then((response) => {
                const { accessToken, user } = response;
                console.log(accessToken, user);
                localStorage.setItem('feathers-jwt', accessToken);
                UserStore.set(() => ({ token: accessToken, user }), 'login');
                enqueueSnackbar('Login successfully', { variant: 'success' });
                if (user.role === 2) {
                    Router.replace('/admin/dashboard');
                }
                else{
                    Router.replace('/accountDetails');
                }
            })
            .catch(error => {
                enqueueSnackbar(error.message && error.message ? error.message : 'Something went wrong!', { variant: 'warning' });
            }).finally(() => {
                setLoading(false);
            });
    };


    return (
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}
            alignItems={'center'} height={'500px'} >
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
            <Button disabled={loading} onClick={() => handleLogin()} variant="contained">
                {loading ? <CircularProgress
                    size={24}
                /> : 'Login'}
            </Button>
        </Box>
    )
}

export default Index
