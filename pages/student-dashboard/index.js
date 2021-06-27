import React, {useEffect, useState} from "react";
import vector from "../../src/asset/explore_vector.svg";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";


/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 13/06/21 10:08 PM
 */



const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 48px)',
        // width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    clickable: {
        cursor: "pointer",
        userSelect: "none",
    },
}));


const StudentDashboard = () => {
    const classes = useStyles();
    useEffect(() => {
        console.log("sstudent dashboard page :");
    }, []);

    return (
        <Container maxWidth={'xl'}>
            <Grid container justify={"center"}
                  alignItems={"center"}>
                <Grid item sm={12} xs={12} md={7}>
                    <Typography>
                        f
                    </Typography>
                </Grid>
                <Grid item sm={12} xs={12} md={5}>
                    <Box m={3} />
                    <img src={vector} alt={'explore'} width={'100%'}/>
                </Grid>
            </Grid>
            <Box height={500}>
                demo
            </Box>
        </Container>
    );
};

export default StudentDashboard;
