/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description create_draft_dialog.js
 * @createdOn 04/07/21 11:38 pm
 */


import {CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogCustomTitle from "../../../src/components/dialogs/DialogTitle";
import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {useSnackbar} from "notistack";
import {createDraft} from "../../../src/apis/exams";
import {useRouter} from "next/router";


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
        paddingTop: '10px'
    }
}));


export default function CreateDraftDialog({open,handleClose }) {

    const classes = useStyles();
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [duration, setDuration] = useState(0);
    const [guideLine, setGuideLine] = useState('');
    const [guideLines, setGuideLines] = useState([]);
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const Router = useRouter();


    const addMoreGuideLine = () => {
        if (guideLine !== '') {
            setGuideLines([...guideLines, guideLine]);
            setGuideLine('');
        }
    }

    const removeAtIndex = (index) => {
        let _list = guideLines;
        _list.splice(index, 1);
        setGuideLines([..._list]);
    }

    const handleDraftCreation = () => {
        if (name === "") {
            enqueueSnackbar("Name is required", {variant: "warning"});
            return;
        } else if (duration === 0) {
            enqueueSnackbar("Duration is required", {variant: "warning"});
            return;
        } else if (guideLines.length === 0) {
            enqueueSnackbar("Guidelines are required", {variant: "warning"});
            return;
        }
        setLoading(true);
        createDraft({
            title: name,
            description: desc,
            duration: duration,
            guidelines: guideLines,
        }).then((res) => {
            handleClose(1);
            console.log(res);
            const {_id: id} = res;
            console.log(id);
            enqueueSnackbar("Draft created successfully", {variant: "success"});
            Router.push(`/draft-details/${id}`);
        }).catch((error) => {
            enqueueSnackbar(
                error.message && error.message
                    ? error.message
                    : "Something went wrong!",
                {variant: "warning"}
            );
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <Dialog open={open} onClose={() => handleClose(1)} aria-labelledby="form-dialog-title" fullWidth>
            <DialogCustomTitle children={'Create Draft'} onClose={() => handleClose(1) }/>
            <DialogContent>
                <Typography className={classes.label}>
                    Name
                </Typography>
                <TextField
                    fullWidth
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    variant="outlined"
                    placeholder={"Enter name of the exam"}
                />
                <Typography className={classes.label}>
                    Description
                </Typography>
                <TextField
                    fullWidth
                    value={desc}
                    onChange={(event) => setDesc(event.target.value)}
                    variant="outlined"
                    rowsMax={2}
                    placeholder={"Enter description of the exam"}
                />
                <Typography className={classes.label}>
                    Duration
                </Typography>
                <TextField
                    fullWidth
                    type={'number'}
                    value={duration}
                    onChange={(event) => setDuration(event.target.value)}
                    variant="outlined"
                    placeholder={"Enter duration of the exam"}
                />
                <Typography className={classes.label}>
                    Guidelines
                </Typography>
                {
                    guideLines.map((e, i) => <Box borderRadius={5} mb={1.2} pl={2} py={0.4} bgcolor={'#EEF0F5'}
                                                  display={'flex'}
                                                  justifyContent={'space-between'} alignItems={'center'}>
                        {e}
                        <IconButton onClick={() => {
                            removeAtIndex(i);
                        }}>
                            <CloseIcon fontSize="default"/>
                        </IconButton>
                    </Box>)
                }
                <TextField
                    fullWidth
                    value={guideLine}
                    onChange={(event) => setGuideLine(event.target.value)}
                    variant="outlined"
                    placeholder={"Enter guideline for the exam"}
                />
                <Box my={1}/>
                <Button color="primary" onClick={addMoreGuideLine}>
                    + Add more guideline
                </Button>
                <Box my={4}/>
                <Button
                    fullWidth
                    disabled={loading}
                    onClick={handleDraftCreation}
                    color="primary"
                    variant="contained"
                >
                    {loading ? <CircularProgress size={24}/> : "Create Draft"}
                </Button>
                <Box m={2}/>
            </DialogContent>
        </Dialog>
    );
}
