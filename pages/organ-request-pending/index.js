import {makeStyles} from "@material-ui/core/styles";
import {useRouter} from "next/router";
import {Button, Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React, {useEffect} from "react";
import app from "../../src/apis";
import {useStore} from "laco-react";
import userStore from "../../src/store/userStore";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 04/07/21 12:38 pm
 */


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

const OrganRequestPending = () => {

    const Router = useRouter();
    const {id} = Router.query;
    const classes = useStyles();
    const {user} = useStore(userStore);

    useEffect(() => {
        if (user.status === 2) {
            Router.replace('/organ-dashboard');
        }
    }, []);

    const handleClick = () => {
        app.logout();
        localStorage.removeItem('feathers-jwt');
        Router.replace('/login');
    }

    return (
        <div className={classes.root}>
            <Container>
                <Grid container justify={'center'} alignItems={'center'}>
                    <Box component={Grid} display={'flex'} justifyContent={'center'} alignItems={'center'}
                         flexDirection={'column'} item xs={12} md={6} sm={12}>
                        <Typography>
                            Your request has been received by the admin.
                        </Typography>
                        <Typography>
                            Wait for the admin to verify you.
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
                            Log out
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

OrganRequestPending.Layout = null;
export default OrganRequestPending;