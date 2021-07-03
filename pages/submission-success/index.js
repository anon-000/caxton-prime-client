/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 04/07/21 1:56 am
 */
import {Button, Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import {useRouter} from "next/router";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#fcf8f8",
        minHeight: "100vh",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    clickable: {
        cursor: "pointer",
        userSelect: "none",
    },
}));

const SubmissionSuccess = () => {

    const Router = useRouter();
    const {id} = Router.query;
    const classes = useStyles();


    const handleClick = () => {
        Router.replace('/student-results');
    }

    return (
        <div className={classes.root}>
            <Container>
                <Grid container justify={'center'} alignItems={'center'}>
                    <Box component={Grid} display={'flex'} justifyContent={'center'} alignItems={'center'}
                         flexDirection={'column'} item xs={12} md={6} sm={12}>
                        <Typography>
                            You have submitted the answers successfully.
                        </Typography>
                        <Typography>
                            Wait for the results to be published.
                        </Typography>
                    </Box>
                    <Grid item>
                        <Button
                            fullWidth
                            // disabled={loading}
                            onClick={handleClick}
                            color="primary"
                            variant="contained"
                        >
                            Go to Results
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

SubmissionSuccess.Layout = null;
export default SubmissionSuccess;