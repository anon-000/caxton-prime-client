import makeStyles from "@material-ui/core/styles/makeStyles";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {useRouter} from "next/router";
import {CircularProgress, Dialog, DialogContent, Menu, MenuItem, TextField} from "@material-ui/core";
import DialogCustomTitle from "../../../src/components/dialogs/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ExamTagsAutoComplete from "../../../src/components/TagsAutoComplete";
import cross from "../../../src/asset/cross_icon.svg";
import {getUserDetails, userPatch} from "../../../src/apis/users";
import {error} from "next/dist/build/output/log";
import userStore from "../../../src/store/userStore";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description user_dialog.js
 * @createdOn 10/07/21 7:56 pm
 */


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: "#757575",
        paddingBottom: '7px',
        paddingTop: '10px'
    },
}));


export default function UserDialog({open, handleClose, userId, refresh}) {

    const classes = useStyles();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [userName, setUserName] = useState();
    const [lane, setLane] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [pin, setPin] = useState();
    const [userLoading, setUserLoading] = useState(true);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        setName("");
        setEmail("");
        setPhone("");
        setUserName("");
        setLane("");
        setCity("");
        setState("");
        setPin("");

        setUserLoading(true);
        getUserDetails(userId).then((res) => {
            setUser(res);
            setName(res.name);
            setEmail(res.email);
            setPhone(res.phone);
            if (res.role === 1) {
                setUserName(res.username);
            } else if (res.role === 2 && res.address) {
                setLane(res.address.lane);
                setCity(res.address.state);
                setState(res.address.state);
                setPin(res.address.pinCode);
            }
        }).catch((e) => {
            enqueueSnackbar(e && e.message ? e.message : 'Something went wrong!', {variant: 'warning'});
        }).finally(() => {
            setUserLoading(false);
        });
    }, [open]);

    const handleSave = () => {
        if (name === '') {
            enqueueSnackbar("Name is required", {variant: "warning"});
            return;
        } else if (email === '') {
            enqueueSnackbar("Email is required", {variant: "warning"});
            return;
        } else if (phone === '') {
            enqueueSnackbar("Phone is required", {variant: "warning"});
            return;
        } else if (user.role === 1 && userName === '') {
            enqueueSnackbar("Username is required", {variant: "warning"});
            return;
        } else if (user.role === 2 && lane === '' && city === '' && state === '' && pin === '') {
            enqueueSnackbar("Complete address is required", {variant: "warning"});
            return;
        }

        const query = user.role === 1 ? {
            name,
            email,
            userName,
            phone,
        } : {
            name,
            email,
            phone,
            address: {
                lane,
                city,
                state,
                pinCode: pin,
            }
        };
        console.log(userId);
        setLoading(true);
        userPatch(user._id, query)
            .then((response) => {
                handleClose();
                refresh();
                enqueueSnackbar("Userinfo updated successfully", {variant: "success"});
            })
            .catch(error => {
                enqueueSnackbar(error.message && error.message ? error.message : 'Something went wrong!', {variant: 'warning'});
            }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
            <DialogCustomTitle children={'User Details'} onClose={handleClose}/>
            <DialogContent>
                {
                    userLoading ? <Box className={classes.root}>
                        <CircularProgress size={64}/>
                    </Box> : <Box>

                        <Typography className={classes.label}>
                            Name
                        </Typography>
                        <TextField
                            fullWidth
                            value={name}
                            defaultValue={name}
                            onChange={(event) => setName(event.target.value)}
                            variant="outlined"
                            placeholder={"Name"}
                        />
                        <Box my={0.4}/>
                        <Typography className={classes.label}>
                            Email
                        </Typography>
                        <TextField
                            fullWidth
                            value={email}
                            defaultValue={email}
                            onChange={(event) => setEmail(event.target.value)}
                            variant="outlined"
                            placeholder={"Email"}
                        />
                        <Box my={0.4}/>
                        <Typography className={classes.label}>
                            Phone
                        </Typography>
                        <TextField
                            fullWidth
                            value={phone}
                            defaultValue={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            variant="outlined"
                            placeholder={"Phone"}
                            type={'number'}
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                            }}
                            min={0}
                        />
                        <Box my={0.4}/>
                        <Typography className={classes.label}>
                            {user.role === 1 ? "Username" : "Address"}
                        </Typography>
                        {
                            user.role === 1 ? <TextField
                                fullWidth
                                value={userName}
                                defaultValue={userName}
                                onChange={(event) => setUserName(event.target.value)}
                                variant="outlined"
                                placeholder={"Email"}
                            /> : <Box>
                                <TextField
                                    fullWidth
                                    value={lane}
                                    defaultValue={lane}
                                    onChange={event => setLane(event.target.value)}
                                    variant="outlined"
                                    placeholder={'Lane'}
                                />
                                <Box m={1}/>
                                <TextField
                                    fullWidth
                                    value={city}
                                    defaultValue={city}
                                    onChange={event => setCity(event.target.value)}
                                    variant="outlined"
                                    placeholder={'City'}
                                />
                                <Box m={1}/>
                                <TextField
                                    fullWidth
                                    value={state}
                                    defaultValue={state}
                                    onChange={event => setState(event.target.value)}
                                    variant="outlined"
                                    placeholder={'State'}
                                />
                                <Box m={1}/>
                                <TextField
                                    fullWidth
                                    value={pin}
                                    defaultValue={pin}
                                    onChange={event => setPin(event.target.value)}
                                    variant="outlined"
                                    placeholder={'Pin'}
                                    type={'number'}
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
                                    }}
                                    min={0}
                                />
                            </Box>

                        }
                        <Box my={4}/>
                        <Button
                            fullWidth
                            disabled={loading}
                            onClick={handleSave}
                            color="primary"
                            variant="contained"
                        >
                            {loading ? <CircularProgress size={24}/> : "Save"}
                        </Button>
                        <Box m={2}/>
                    </Box>
                }
            </DialogContent>
        </Dialog>
    );
}
