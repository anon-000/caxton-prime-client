import React from "react";
import vector from "../../src/asset/explore_vector.svg";
import wave from "../../src/asset/wave_vector.svg";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import {useStore} from "laco-react";
import userStore from "../../src/store/userStore";


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
    box: {
        border: "1px solid #E7E7E7",
        borderBlock: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)"
    },
    quoteBox: {
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
        color: "#3F3D56",
        fontWeight: "700",
        fontSize: "18px",
        lineHeight: '26px',
        marginRight: '10rem',
        '@media (max-width:1050px)': {
            marginRight: '1rem',

        },
        '@media (max-width:900px)': {
            marginRight: '1rem',
        },
    }
}));


const OrganisationDashboard = () => {
    const classes = useStyles();
    const {user} = useStore(userStore);

    const data = [
        {
            title: "Students",
            count: 48,
        },
        {
            title: "Organizations",
            count: 32,
        },
        {
            title: "Topic",
            count: 20,
        },
        {
            title: "Exams",
            count: 90,
        }
    ];

    return (
        <Container>
            <Grid container justify={"center"} spacing={6}
                  alignItems={"flex-start"}>
                <Grid item sm={12} xs={12} md={7}>
                    <Box m={4}/>
                    <Typography variant="h2">
                        Hey {user["name"]},
                    </Typography>
                    <Box m={1}/>
                    <Typography variant="h2">
                        Welcome to Caxton Prime 🤙
                    </Typography>
                    <Box m={5.5}/>
                    <Box component={Grid} display={'flex'} flexWrap={'wrap'}>
                        {
                            data.map((e) => {
                                return (
                                    <Grid item md={6} xs={3} sm={3}>
                                        <InfoBox title={e.title} count={e.count}/>
                                    </Grid>
                                )
                            })
                        }
                    </Box>
                    <Box m={8}/>
                    <img src={wave} alt={'explore'} width={'100%'}/>
                </Grid>
                <Box component={Grid} className={classes.root} item sm={12} xs={12} md={5}>
                    <img src={vector} alt={'explore'} width={'100%'}/>
                </Box>
            </Grid>
        </Container>
    );
};

export default OrganisationDashboard;


const InfoBox = ({title, count}) => {
    const classes = useStyles();
    return (
        <Box p={2} m={1}
             className={classes.box}
             display={'flex'} justifyContent={'center'}
             alignItems={'flex-start'} flexDirection={'column'}>
            <Typography>
                {title}
            </Typography>
            <Typography>
                {count}
            </Typography>
        </Box>
    );
}

