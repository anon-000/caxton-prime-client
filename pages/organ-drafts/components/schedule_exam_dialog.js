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

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description schedule_exam_dialog.js
 * @createdOn 06/07/21 12:23 am
 */




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
    },
    clickable: {
        cursor: "pointer",
        userSelect: "none",
    },
    paddingX: {
        paddingRight: theme.spacing(6),
        paddingLeft: theme.spacing(6),
    },
    textField: {
        // marginLeft: theme.spacing(1),
        //marginRight: theme.spacing(1),
        width: 260,
        cursor: "pointer",
        userSelect: "none",
    },
    autoComplete: {
        marginLeft: theme.spacing(-1),
        marginTop: theme.spacing(-1),
        //width: 260,
        cursor: "pointer",
        userSelect: "none",
    },
    withHover: {
        cursor: 'pointer',
        userSelect: 'none',
        border: '1px solid',
        '&:hover': {
            backgroundColor: "#F03D5F",
            color: '#ffffff',
            border: '1px solid', borderColor: '#F03D5F',
            fontWeight: '600'
        }
    },
}));


export default function ScheduledExamDialog({open, handleClose}) {

    const classes = useStyles();
    const [date, setDate] = useState(new Date(new Date('2014-08-1821:11')));
    const [time, setTime] = useState(new Date('2021-08-18T21:11:54'));
    const [tags, setTags] = useState([]);
    const [difficulty, setDifficulty] = useState(0);
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const Router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (i) => {
        console.log(i);
        setDifficulty(i);
        setAnchorEl(null);
    };

    const handleDateChange = (date, x) => {
        console.log(x);
    };

    const addMoreTags = (tag) => {
        if (tag && tag !== '') {
            setTags([...tags, tag]);
        }
    }

    const removeAtIndex = (index) => {
        let _list = tags;
        _list.splice(index, 1);
        setTags([..._list]);
    }

    useEffect(() => {
        setTags([]);
        setDate(null);
        setDifficulty(0);
    }, [open]);

    const handleDraftCreation = () => {
        if (difficulty === 0) {
            enqueueSnackbar("Name is required", {variant: "warning"});
            return;
        } else if (tags.length === 0) {
            enqueueSnackbar("Guidelines are required", {variant: "warning"});
            return;
        }
        // setLoading(true);
        // createDraft({
        //     title: name,
        //     description: desc,
        //     duration: duration,
        //     guidelines: guideLines,
        // }).then((res) => {
        //     console.log(res);
        //     const {_id: id} = res;
        //     console.log(id);
        //     enqueueSnackbar("Draft created successfully", {variant: "success"});
        //     Router.push(`/draft-details/${id}`);
        // }).catch((error) => {
        //     enqueueSnackbar(
        //         error.message && error.message
        //             ? error.message
        //             : "Something went wrong!",
        //         {variant: "warning"}
        //     );
        // }).finally(() => {
        //     setLoading(false);
        // });
    }

    return (
        <Dialog open={open} onClose={() => handleClose(2)} aria-labelledby="form-dialog-title" fullWidth>
            <DialogCustomTitle children={'Schedule exam'} onClose={() => handleClose(2)}/>
            <DialogContent>
                <Typography className={classes.label}>
                    Select exam tags
                </Typography>
                <ExamTagsAutoComplete className={classes.autoComplete} onSelect={addMoreTags}
                                      placeholder={'Search for tags'}/>
                {
                    tags.length === 0 ? <Box/> : <Box display={"flex"} mt={1} flexWrap={'wrap'}>
                        {
                            tags.map((e, i) => <Box
                                    display={'flex'}
                                    className={classes.withHover}
                                    mb={0.8} mr={0.8} px={2} borderRadius={16}
                                    borderColor={'#FFEEF2'} bgcolor={'#FFEEF2'}
                                    color={'#F03D5F'} py={0.6}>
                                    {e ? e.name : ''}
                                    <Box ml={1.5} mt={0.2} onClick={() => removeAtIndex(i)}>
                                        <img src={cross} alt={'x'}/>
                                    </Box>
                                </Box>
                            )
                        }
                    </Box>
                }
                <Typography className={classes.label}>
                    Difficulty Level
                </Typography>
                <Box borderRadius={5} mb={1} p={2} bgcolor={'#EEF0F5'} width={165}
                     display={'flex'} onClick={handleMenuClick} className={classes.clickable}
                     justifyContent={'space-between'} alignItems={'center'}>
                    {difficulty === 0 ? "Select difficulty" : difficulty === 1 ? "Easy" : difficulty === 2 ? "Medium" : "Hard"}
                </Box>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem className={classes.paddingX} onClick={() => handleMenuClose(1)}>Easy</MenuItem>
                    <MenuItem className={classes.paddingX} onClick={() => handleMenuClose(2)}>Medium</MenuItem>
                    <MenuItem className={classes.paddingX} onClick={() => handleMenuClose(3)}>Hard</MenuItem>
                </Menu>
                <Typography className={classes.label}>
                    Exam Date & Time
                </Typography>
                <TextField
                    id="datetime-local"
                    type="datetime-local"
                    format="MM/dd/yyyy"
                    //value={date}
                    defaultValue={date}
                    onChange={handleDateChange}
                    className={classes.textField}
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <Box my={5}/>
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
