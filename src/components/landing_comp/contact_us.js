/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description contact_us.js
 * @createdOn 20/07/21 8:17 am
 */

import React, {useState} from 'react';
import {Box, CircularProgress, Grid, TextField, Typography} from "@material-ui/core";
import Image1 from '../../../src/asset/contact.svg';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useSnackbar} from "notistack";
import Button from "@material-ui/core/Button";
import {submitQuery} from "../../apis/query";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        width: '80%',
        maxHeight: 435,
    },
    label: {
        color: "#757575",
        paddingBottom: '7px',
        paddingTop: '10px',
        paddingRight: '16px',
        paddingLeft: '16px',
    },
    menu: {
        width: '200px'
    },
    clickable: {
        cursor: "pointer",
        userSelect: "none",
    },
    paddingX: {
        paddingRight: '16px',
        paddingLeft: '16px',
        marginTop: '10px',
        marginBottom: '10px'
    },
    marginX: {
        padding: `${theme.spacing(3)}`,
    },
    shadow: {
        boxShadow: "2px 2px 6px rgba(18, 73, 84, 0.15)",
    },
    fullWidth: {
        width: '100%'
    }
}));


const ContactUs = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const handleSubmit = () => {
        if (name === '') {
            enqueueSnackbar('Name is required', {variant: 'warning'});
            return;
        } else if (phone === '') {
            enqueueSnackbar('Phone number is required', {variant: 'warning'});
            return;
        } else if (email === '') {
            enqueueSnackbar('Email is required', {variant: 'warning'});
            return;
        } else if (!validateEmail(email)) {
            enqueueSnackbar('Email is invalid', {variant: 'warning'});
            return;
        } else if (msg === '') {
            enqueueSnackbar('Query is required', {variant: 'warning'});
            return;
        }
        setLoading(true);
        submitQuery({
            name,
            email,
            phone,
            msg,
        }).then((res) => {
            enqueueSnackbar('Query submitted successfully', {variant: 'success'});
            setName('');
            setPhone('');
            setEmail('');
            setMsg('');
        }).catch((error) => {
            enqueueSnackbar(error.message && error.message ? error.message : 'Something went wrong!', {variant: 'warning'});
        }).finally(() => {
            setLoading(false);
        })
    }


    return (
        <div id={'contact_us'} style={{overflow: 'hidden'}}>
            <Grid container>
                <Grid xs={12} item conatiner justify={'center'} alignItems={'center'}>
                    <Typography align={'center'} variant={'h2'} color={'primary'}>
                        {'Contact Us'}
                    </Typography>
                    <Box mb={7}/>
                </Grid>

                <Grid container justify={'center'} alignItems={'center'} item xs={12} sm={4} md={7}>
                    <img data-aos="zoom-in" data-aos-delay="200" data-aos-duration="800" src={Image1} width={'80%'}
                         alt={''}/>
                </Grid>
                <Grid data-aos="fade-left" data-aos-delay="200" data-aos-duration="800" container justify={'flex-start'}
                      alignItems={'center'} item xs={12} sm={8} md={5}>
                    <Box className={classes.shadow}>
                        <Box m={4}/>
                        <Box className={classes.paddingX} color={'#757575'}>
                            <Typography>
                                For further queries, feel free to call us at 6371824546 or mail us at
                                info@caxtonprime.com.
                            </Typography>
                        </Box>
                        <TextField
                            data-aos="zoom-in"
                            data-aos-duration="400"
                            data-aos-delay="300"
                            fullWidth
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            variant="outlined"
                            placeholder={"Enter your name"}
                            className={classes.paddingX}
                        />

                        <TextField
                            data-aos="zoom-in"
                            data-aos-duration="400"
                            data-aos-delay="300"
                            fullWidth
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            variant="outlined"
                            placeholder={"Your contact number"}
                            className={classes.paddingX}
                            type={'number'}
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                            }}
                            min={0}
                        />
                        <TextField
                            data-aos="zoom-in"
                            data-aos-duration="400"
                            data-aos-delay="300"
                            fullWidth
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            variant="outlined"
                            placeholder={"Email Address"}
                            className={classes.paddingX}
                        />
                        <TextField
                            data-aos="zoom-in"
                            data-aos-duration="400"
                            data-aos-delay="300"
                            fullWidth
                            value={msg}
                            onChange={(event) => setMsg(event.target.value)}
                            variant="outlined"
                            placeholder={"Type your queries here"}
                            //className={classes.paddingX}
                            multiline
                            rows={6}
                            inputProps={{
                                style: {
                                    padding: 16
                                }
                            }}
                        />
                        <Box p={2} mt={1.6}>
                            <Button
                                fullWidth
                                disabled={loading}
                                onClick={handleSubmit}
                                color="primary"
                                variant="contained"
                            >
                                {loading ? <CircularProgress size={24}/> : "Submit"}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default ContactUs;