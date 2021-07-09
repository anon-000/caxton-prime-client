/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description add_question_card.js
 * @createdOn 06/07/21 2:15 pm
 */
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {CircularProgress, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {useSnackbar} from "notistack";
import {createTag} from "../../../src/apis/tags";


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
        width: '29vw',
        boxShadow: "2px 2px 6px rgba(18, 73, 84, 0.15)",
        //position: 'fixed',
        margin: '100px 30px',
        '@media (max-width:1050px)': {
            margin: '50px 30px',
            width: '29vw',
        },
        '@media (max-width:900px)': {
            margin: '50px 0px',
            width: '100vw',
        },
        '@media (max-width:500px)': {
            margin: '50px 0px',
            width: '100%',
        },
    },
    fullWidth: {
        width: '100%'
    }
}));


const AddTagCard = ({onNewTag}) => {
    const [tag, setTag] = useState('');
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        clearFormData();
    }, []);


    const handleTagCreation = () => {
        if (tag === '' && !tag) {
            enqueueSnackbar("Tag is required", {variant: "warning"});
            return;
        }
        setLoading(true);
        createTag({
            name: tag,
        }).then((res) => {
            clearFormData();
            onNewTag(res);
            enqueueSnackbar("Exam Tag created successfully", {variant: "success"});
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
        setTag('');
    }

    return (
        <Box borderRadius={10} className={classes.shadow}>
            <Box bgcolor={'#F03D5F'} color={'#ffffff'}
                 py={3} display={'flex'} justifyContent={'center'}
                 borderRadius={'20px 0px'}
                 fontSize={18} fontWeight={600}>
                Add Exam Tags
            </Box>
            <Box m={2}/>
            <Typography className={classes.label}>
                Tag name
            </Typography>
            <TextField
                fullWidth
                value={tag}
                onChange={(event) => setTag(event.target.value)}
                variant="outlined"
                placeholder={"Enter name of the tag"}
                className={classes.paddingX}
            />
            <Box p={2} mt={4}>
                <Button
                    fullWidth
                    disabled={loading}
                    onClick={handleTagCreation}
                    color="primary"
                    variant="contained"
                >
                    {loading ? <CircularProgress size={24}/> : "Create Tag"}
                </Button>
            </Box>
        </Box>
    )

}


export default AddTagCard;

