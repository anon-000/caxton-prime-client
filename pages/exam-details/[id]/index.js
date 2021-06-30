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
    const [examLoading, setExamLoading] = useState(false);
    const [exam, setExam] = useState();
    const {enqueueSnackbar} = useSnackbar();
    const Router = useRouter();
    const {id} = Router.query;
    const tags = ["Physics", "Mechanics", "Quiz", "Trending", "Brainstorming"];
    const guideLines = [
        "Do not appear for exam before or after exam time. Login is for single use only. It will be deactivated automatically after first use.",
        " If any student fail to apply for certificate then result will not be processed and certificate will not be dispatched. ",
        "All our exam servers and backup server will be active for exam period, if any problem persists: It means there is problem in your computer, setting, Internet. ",
        "Exam rules are very strict and important part so it must considered with priority and any type of negligence is not acceptable.",
        "For any query / help or support: always submit new ticket from www.caxtonprime.co.in/support or www.ifs.edu.in/support or www.4n6.in/support or you can also send email to exam@forensic.co.in All times (exam times etc) are according to IST: Indian Standard Time.",
    ];
    const colors = ["#0EA81D", "#FF0000", "#848708", "#4D59C2", "#FF00B8"];
    useEffect(() => {
        console.log("exam details page :");
        setExamLoading(true);
        getExamDetails(id)
            .then((res) => {
                console.log(res);
                // setExam(res);
            })
            .catch((error) => {
                enqueueSnackbar(error.message ? error.message : 'Something went wrong!', {variant: 'error'});
            })
            .finally(() => {
                setExamLoading(false);
            });

    }, []);

    const handleStartExam = () => {
    };

    return (
        <Box className={classes.root}>
            <Container maxWidth={'xl'}>
                {
                    examLoading ? <CircularProgress size={64}/> : <Box
                        container
                        display={"flex"}
                        justify={"center"}
                        alignItems={"center"}
                        height={"100%"}
                        component={Grid}
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
                                <Typography variant="h1">Physics Test</Typography>
                                <Box m={1} />
                                <Box display={"flex"}>
                                    {tags.map((e, i) => (
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
                                        >
                                            {e}
                                        </Box>
                                    ))}
                                </Box>
                                <Box m={1.5}/>
                                <Typography variant="body2">
                                    {exam}
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
                                {guideLines.map((e) => (
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
                                    {loading ? <CircularProgress size={24}/> : "Start Exam"}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                }
            </Container>
        </Box>
    );
};

export default ExamDetails;
