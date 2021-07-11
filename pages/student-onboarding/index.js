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
import Vector from "../../src/asset/student_onboarding_vector.svg"
import Typography from "@material-ui/core/Typography";
import SelectAvatar from "./components/select_avatar";
import {editUser, userPatch} from "../../src/apis/users";
import ImageUploadDialog from "../../src/components/dialogs/ImageUploadDialog";

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


const StudentOnBoarding = () => {

    const [username, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState('https://flyinryanhawks.org/wp-content/uploads/2016/08/profile-placeholder.png ');
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const Router = useRouter();
    const {user} = useStore(userStore);
    const classes = useStyles();


    useEffect(() => {
        console.log("on boarding page");
        console.log("user", user);
    }, []);

    const handleStudentOnBoarding = () => {
        if (username === '') {
            enqueueSnackbar('User name is required', {variant: 'warning'});
            return;
        } else if (phone === '') {
            enqueueSnackbar('Phone number is required', {variant: 'warning'});
            return;
        } else if (phone.length !== 10) {
            enqueueSnackbar('Enter a valid phone number', {variant: 'warning'});
            return;
        }
        setLoading(true);
        editUser(user['_id'], {"userName": username, phone, avatar})
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

    const onAvatarEdit = (url) => {
        console.log("uploaded", url);
        setAvatar(url);
    }


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
                                Basic Details
                            </Typography>
                            <Box m={2}/>
                            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}
                                 justifyContent={'center'} width={1}>
                                <SelectAvatar avatar={avatar} onClick={() => setOpenDialog(true)}/>
                                <Box m={0.6}/>
                                <Box component={Typography} variant={'caption'} color={'#757575'}>
                                    Add Photo
                                </Box>
                            </Box>
                            <Box m={1.6}/>
                            <TextField
                                fullWidth
                                value={username}
                                onChange={event => setUserName(event.target.value)}
                                variant="outlined"
                                placeholder={'User name'}
                            />
                            <Box m={0.6}/>
                            <TextField
                                fullWidth
                                value={phone}
                                onChange={event => setPhone(event.target.value)}
                                variant="outlined"
                                placeholder={'Phone number'}
                                type={'number'}
                                onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                }}
                                min={0}
                            />
                            <Box m={1}/>
                            <Button fullWidth disabled={loading} onClick={handleStudentOnBoarding} color="primary"
                                    variant="contained">
                                {loading ? <CircularProgress
                                    size={24}
                                /> : 'Proceed'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <ImageUploadDialog
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    setAvatar={onAvatarEdit}
                    //setAvatarEdited={setAvatarEdited}
                />
            </Container>

        </Box>
    )
}

StudentOnBoarding.Layout = null
export default StudentOnBoarding
