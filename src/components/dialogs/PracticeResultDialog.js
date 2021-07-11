import makeStyles from "@material-ui/core/styles/makeStyles";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {useRouter} from "next/router";
import {CircularProgress, Dialog, DialogContent, Grid} from "@material-ui/core";
import DialogCustomTitle from "./DialogTitle";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description PracticeResultDialog.js
 * @createdOn 11/07/21 8:52 pm
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
        cursor: "pointer",
        userSelect: "none",
        paddingRight: "40px"
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


export default function PracticeResultDialog({open, handleClose, questions}) {

    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [secured, setSecured] = useState(0);
    const [numberOfQ, setNumberOfQ] = useState(0);
    const [notVisited, setNotVisited] = useState(0);
    const [answered, setAnswered] = useState(0);
    const [skipped, setSkipped] = useState(0);
    const {enqueueSnackbar} = useSnackbar();
    const Router = useRouter();


    useEffect(() => {
        setTotal(0);
        setSecured(0);
        setNotVisited(0);
        setNumberOfQ(0);
        setAnswered(0);
        setSkipped(0);
        //console.log(questions);
        setNumberOfQ(questions.length);
        setTotal(questions.length * 4);
        let nv = 0, sk = 0, ans = 0;
        questions.forEach((e) => {
            console.log("for each",e);
            if (e.type === 1) {
                /// not visited
                nv += 1;
            } else if (e.type === 2) {
                /// skipped
                sk += 1;
               // setSkipped(skipped + 1);
            } else if (e.type === 3) {
                /// answered
                ans += 1;
                //setAnswered(answered + 1);
                if (e.answer[0] === e.myAnswer) {
                    /// correct
                    setSecured(secured + 4);
                }
            }
        });
        setNotVisited(nv);
        setSkipped(sk);
        setAnswered(ans);
    }, [open]);

    const backToDash = () => {
        Router.replace('/student-dashboard');
    }


    return (
        <Dialog open={open} onClose={() => handleClose()} aria-labelledby="form-dialog-title" fullWidth>
            <DialogCustomTitle children={'Practice Result'} onClose={() => handleClose()}/>
            <DialogContent>
                <Typography className={classes.label}>
                    Result of the practice set you attended
                </Typography>
                <Box my={1}/>
                <Divider/>
                <Box my={1}/>
                <Grid container>
                    <Grid item md={6} xs={6} sm={6}>
                        <QuestionType color={"#F03D5F"} text={`Total Questions: ${numberOfQ}`}/>
                        <QuestionType color={"#EBF4FF"} text={`Not visited : ${notVisited}`}/>
                    </Grid>
                    <Grid item md={6} xs={6} sm={6}>
                        <QuestionType color={"#FFEEF2"} text={`Skipped : ${skipped}`}/>
                        <QuestionType color={"#F5FFCC"} text={`Answered : ${answered}`}/>
                    </Grid>
                </Grid>
                <Box my={1}/>
                <Divider/>
                <Box my={1}/>
                <Grid container>
                    <Grid item md={6} xs={6} sm={6}>
                        <QuestionType color={"#000000"} text={`Total Marks: ${total}`}/>
                    </Grid>
                    <Grid item md={6} xs={6} sm={6}>
                        <QuestionType color={"#000000"} text={`Marks secured : ${secured}`}/>
                    </Grid>
                </Grid>
                <Box my={5}/>
                <Button
                    fullWidth
                    disabled={loading}
                    onClick={backToDash}
                    color="primary"
                    variant="contained"
                >
                    {loading ? <CircularProgress size={24}/> : "Back To Dashboard"}
                </Button>
                <Box m={2}/>
            </DialogContent>
        </Dialog>
    );
}


const QuestionType = ({color, text}) => {
    return (
        <Box display={'flex'} my={1} ml={5}>
            <Box bgcolor={color} borderRadius={5} height={20} width={20} mr={1}/>
            <Typography variant="subtitle">
                {text}
            </Typography>
        </Box>
    );
}