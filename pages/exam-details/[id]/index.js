import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, CircularProgress, Grid, Hidden, Typography} from "@material-ui/core";
import {Container} from "@material-ui/core";
import vector from "../../../src/asset/exam_details_vector.svg";
import {Button} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {useRouter} from "next/router";
import {getExamDetails} from "../../../src/apis/exams";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 13/06/21 10:08 PM
 */

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundImage: `url(${CoverImage})`,
        // backgroundPosition: "center",
        // backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        height: 'calc(100vh - 48px)',
        // width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // [theme.breakpoints.down("lg")]: {
        //   padding: "0px 120px",
        // },
        // [theme.breakpoints.down("md")]: {
        //   padding: "0px 80px",
        // },
        // [theme.breakpoints.down("sm")]: {
        //   padding: "0px 60px",
        // },
        // [theme.breakpoints.down("xs")]: {
        //   padding: "0px 8px",
        // },
    },
    create: {
        cursor: "pointer",
        userSelect: "none",
    },
}));

const ExamDetails = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [canAttend, setCanAttend] = useState(false);
    const [examLoading, setExamLoading] = useState(true);
    const [examData, setExamData] = useState(null);
    const [timerText, setTimerText] = useState('00h : 00m : 00s');
    const {enqueueSnackbar} = useSnackbar();
    const Router = useRouter();
    const {id} = Router.query;

    const colors = ["#0EA81D", "#FF0000", "#848708", "#4D59C2", "#FF00B8"];
    useEffect(() => {
        console.log("exam details page :");
        setExamLoading(true);
        getExamDetails(id)
            .then((res) => {
                console.log(res);
                setExamData(res);
                let countDownDate = new Date("July 4, 2021 15:37:25").getTime();

                let x = setInterval(function () {

                    // Get today's date and time
                    let now = new Date().getTime();

                    // Find the distance between now and the count down date
                    let distance = countDownDate - now;

                    // Time calculations for days, hours, minutes and seconds
                    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    // Display the result in the element with id="demo"
                    setTimerText(hours + "h : "
                        + minutes + "m : " + seconds + "s ");

                    // If the count down is finished, write some text
                    if (distance < 0) {
                        clearInterval(x);
                        setTimerText('00:00:00');
                        setCanAttend(true);
                    }
                }, 1000);
            })
            .catch((error) => {
                enqueueSnackbar(error.message ? error.message : 'Something went wrong!', {variant: 'error'});
            })
            .finally(() => {
                setExamLoading(false);
            });

    }, []);

    const handleStartExam = () => {
        Router.push(`/attend-exam/${examData._id}`);
    };

    return (
        <Box className={classes.root}>
            <Container maxWidth={'xl'}>
                {
                    examLoading ? <CircularProgress size={64}/> : <Grid
                        container
                        spacing={0}
                    >
                        <Box
                            xs={12}
                            sm={12}
                            md={7}
                            item
                            component={Grid}
                            //height={'100vh'}
                            display={"flex"}
                            justify={"center"}
                            alignItems={"center"}
                        >
                            <Box px={3}>
                                <Typography variant="h1">{examData.title}</Typography>
                                <Box m={1}/>
                                <Box display={"flex"} flexWrap={'wrap'}>
                                    {examData.examTags.map((e, i) => (
                                        <Box
                                            fontSize={12}
                                            fontWeight={"bold"}
                                            color={"#ffffff"}
                                            bgcolor={colors[i % 5]}
                                            borderRadius={5}
                                            px={2}
                                            py={0.6}
                                            mx={i === 0 ? 0 : 1}
                                            mr={i === 0 ? 0 : 0}
                                            mt={1}
                                        >
                                            {e.name}
                                        </Box>
                                    ))}
                                </Box>
                                <Box m={1.5}/>
                                <Typography variant="body2">
                                    {examData.description}
                                </Typography>
                                <Box m={2}/>
                                <Box
                                    component={Typography}
                                    variant="subtitle2"
                                    borderBottom={2}
                                    maxWidth={160}
                                >
                                    Exam Guidelines
                                </Box>
                                <Box m={1.8}/>
                                {examData.guidelines.map((e) => (
                                    <Box display={"flex"} my={1}>
                                        <Box
                                            bgcolor={"#F03D5F"}
                                            mr={1.5}
                                            mt={0.4}
                                            p={1}
                                            height={14}
                                            width={14}
                                            borderRadius={"50%"}
                                        />
                                        <Typography variant="body2">{e}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                        <Box
                            xs={12}
                            sm={12}
                            md={5}
                            item
                            component={Grid}
                            display={"flex"}
                            justify={"center"}
                            alignItems={"center"}
                        >
                            <Box
                                px={10}
                                width={"100%"}
                                display={"flex"}
                                justify={"center"}
                                alignItems={"center"}
                                flexDirection={"column"}
                            >
                                <Hidden smDown>
                                    <img src={vector} alt={"exam-details"}/>
                                    <Box m={1.4}/>
                                </Hidden>

                                <Button
                                    fullWidth
                                    disabled={loading}
                                    onClick={() => handleStartExam()}
                                    color="primary"
                                    variant="contained"
                                >
                                    {loading ? <CircularProgress size={24}/> : canAttend ? "Start Exam" : timerText}
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                }
            </Container>
        </Box>
    );
};

export default ExamDetails;
