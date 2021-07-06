/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description add_question_card.js
 * @createdOn 06/07/21 2:15 pm
 */
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {CircularProgress, Menu, MenuItem, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {useSnackbar} from "notistack";
import {createQuestion} from "../../../../src/apis/exam_questions";


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
    },
    marginX: {
        padding: `${theme.spacing(3)}`,
    },
    shadow: {
        boxShadow: "2px 2px 6px rgba(18, 73, 84, 0.15)",
    }
}));


const AddQuestionCard = ({examId}) => {
    const [question, setQuestion] = useState('');
    const [option, setOption] = useState('');
    const [answer, setAnswer] = useState('');
    const [options, setOptions] = useState([]);
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        clearFormData();
    }, []);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (i) => {
        console.log(i);
        setAnswer(i);
        setAnchorEl(null);
    };


    const addMoreOption = () => {
        if (option !== '' && option) {
            setOptions([...options, option]);
            setOption('');
        }
    }

    const removeAtIndex = (index) => {
        let _list = options;
        _list.splice(index, 1);
        setOptions([..._list]);

        if (!options.includes(answer)) {
            setAnswer('');
        }
    }


    const handleQuestionCreation = () => {
        if (question === '' && !question) {
            enqueueSnackbar("Question is required", {variant: "warning"});
            return;
        } else if (options.length === 0) {
            enqueueSnackbar("Options is required", {variant: "warning"});
            return;
        } else if (answer === '') {
            enqueueSnackbar("Answer is required", {variant: "warning"});
            return;
        } else if (options.length < 4) {
            enqueueSnackbar("Add more options", {variant: "warning"});
            return;
        }
        setLoading(true);
        createQuestion({
            question: question,
            options: options,
            answer: answer,
            exam: examId,
        }).then((res) => {
            clearFormData();
            enqueueSnackbar("Question created successfully", {variant: "success"});
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

    const clearFormData = () => {
        setQuestion('');
        setAnswer('');
        setOption('');
        setOptions([]);
    }

    return (
        <Box borderRadius={10} className={classes.shadow}>
            <Box bgcolor={'#F03D5F'} color={'#ffffff'}
                 py={3} display={'flex'} justifyContent={'center'}
                 borderRadius={'20px 0px'}
                 fontSize={18} fontWeight={600}>
                Add Question
            </Box>
            <Box m={2}/>
            <Typography className={classes.label}>
                Question
            </Typography>
            <TextField
                fullWidth
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                variant="outlined"
                placeholder={"Enter your question"}
                className={classes.paddingX}
            />
            <Typography className={classes.label}>
                Options
            </Typography>
            {
                options.map((e, i) => <Box mx={2} borderRadius={5} mb={1.2} pl={2} py={0.4} bgcolor={'#EEF0F5'}
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
            {
                options.length < 4 ? <TextField
                    fullWidth
                    className={classes.paddingX}
                    value={option}
                    onChange={(event) => setOption(event.target.value)}
                    variant="outlined"
                    placeholder={"Enter your option"}
                /> : <Box/>
            }
            <Box my={1}/>
            {
                options.length < 4 ? <Button className={classes.paddingX} color="primary" onClick={addMoreOption}>
                    + Add more guideline
                </Button> : <Box/>
            }
            <Box my={2}/>
            {
                options.length > 0 ? <Box px={2} display={'flex'} alignItems={'center'}>
                    <Typography>
                        Select right answer
                    </Typography>
                    <Box borderRadius={5} mb={1} ml={10} p={2} bgcolor={'#EEF0F5'} width={200}
                         display={'flex'} onClick={handleMenuClick} className={classes.clickable}
                         justifyContent={'space-between'} alignItems={'center'}>
                        {answer === '' ? "Choose an option" : answer}
                        <ArrowDropDownIcon/>

                    </Box>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        {
                            options.map((e) => <MenuItem className={classes.menu}
                                                         onClick={() => handleMenuClose(e)}>{e}</MenuItem>)
                        }
                    </Menu>
                </Box> : <Box/>
            }
            <Box p={2}>
                <Button
                    fullWidth
                    disabled={loading}
                    onClick={handleQuestionCreation}
                    color="primary"
                    variant="contained"
                >
                    {loading ? <CircularProgress size={24}/> : "Create Question"}
                </Button>
            </Box>
        </Box>
    )

}


export default AddQuestionCard;

