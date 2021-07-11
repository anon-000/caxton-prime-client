import React, {useEffect} from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import {useStore} from "laco-react";
import UserStore from "../store/userStore";
import Head from "next/head";
import Button from "@material-ui/core/Button";
import {logout} from "../apis/authentication";
import {useRouter} from "next/router";
import {Box} from "@material-ui/core";
import {Chip} from "@material-ui/core";
import Popover from '@material-ui/core/Popover';
import {useState} from "react";
import Logo from '../../src/asset/appBarLogo.svg'
import UserDialog from "../../pages/admin-users/components/user_dialog";


// import SelectedAccountStore from '../store/selectedAccountStore';


/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description Header.js
 * @createdOn 27/06/21 9:22 pm
 */



const lightColor = "rgba(255, 255, 255, 0.7)";

const styles = (theme) => ({
    secondaryBar: {
        zIndex: 0,
    },
    menuButton: {
        marginLeft: -theme.spacing(1),
    },
    link: {
        textDecoration: "none",
        color: lightColor,
        "&:hover": {
            color: theme.palette.common.white,
        },
    },
    button: {
        borderColor: lightColor,
    },
    title: {
        fontWeight: "700",
        fontSize: 16,
        cursor: "pointer",
        userSelect: "none",
    },
});

function Header(props) {
    const {classes, onDrawerToggle, title} = props;
    const {user} = useStore(UserStore);
    const Router = useRouter();
    const [current, setCurrent] = useState(0);
    const [userOpen, setUserOpen] = useState(false);

    useEffect(() => {
        if (Router.route === '/student-exams') {
            setCurrent(1);
        } else if (Router.route === '/student-practice-sets') {
            setCurrent(2);
        } else if (Router.route === '/student-results') {
            setCurrent(3);
        } else {
            setCurrent(0);
        }
    }, []);


    console.log(user);

    const handleLogout = () => {
        localStorage.removeItem('feathers-jwt');
        localStorage.removeItem('selectedAccount');
        logout();
        window.location.reload();
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const handleIndexChange = (i) => {
        if (i === 1) {
            Router.push('/student-exams');
        } else if (i === 2) {
            Router.push('/student-practice-sets');
        } else if (i === 3) {
            Router.push('/student-results');
        } else {
            Router.push('/student-dashboard');
        }
        setCurrent(i);
    }

    const handleMyProfile = () => {
        setAnchorEl(null);
        setUserOpen(true);
    }

    return (
        <React.Fragment>
            <Head>
                <title>
                    {title ? title + " | Caxton Prime" : "Caxton Prime"}
                </title>
            </Head>
            <AppBar position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Hidden smUp>
                            <Grid item>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={onDrawerToggle}
                                    className={classes.menuButton}
                                >
                                    <MenuIcon/>
                                </IconButton>
                            </Grid>
                        </Hidden>
                        <Box m={1} pt={0.5}>
                            <img src={Logo} alt={'logo'}/>
                        </Box>
                        <Hidden smDown>
                            <Box
                                component={Typography}
                                fvariant="h6"
                                className={classes.title}
                                borderBottom={current === 0 ? 3 : 0}
                                borderColor={current === 0 ? "#ffffff" : "#F03D5F"}
                                px={1}
                                onClick={() => handleIndexChange(0)}
                                width={110}
                                height={36}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                Explore
                            </Box>
                        </Hidden>
                        <Hidden smDown>
                            <Box
                                component={Typography}
                                fvariant="h6"
                                className={classes.title}
                                borderBottom={current === 1 ? 3 : 0}
                                borderColor={current === 1 ? "#ffffff" : "#F03D5F"}
                                px={1}
                                onClick={() => handleIndexChange(1)}
                                width={110}
                                height={36}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                Exams
                            </Box>
                        </Hidden>
                        <Hidden smDown>
                            <Box
                                component={Typography}
                                fvariant="h6"
                                className={classes.title}
                                borderBottom={current === 2 ? 3 : 0}
                                borderColor={current === 2 ? "#ffffff" : "#F03D5F"}
                                px={1}
                                onClick={() => handleIndexChange(2)}
                                width={150}
                                height={36}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                Practice Sets
                            </Box>
                        </Hidden>
                        <Hidden smDown>
                            <Box
                                component={Typography}
                                fvariant="h6"
                                className={classes.title}
                                borderBottom={current === 3 ? 3 : 0}
                                borderColor={current === 3 ? "#ffffff" : "#F03D5F"}
                                px={1}
                                onClick={() => handleIndexChange(3)}
                                width={110}
                                height={36}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                Results
                            </Box>
                        </Hidden>
                        {/*<Typography>*/}
                        {/*    {current}*/}
                        {/*</Typography>*/}
                        <Grid item xs/>
                        <Grid item>
                            <Box>
                                <Chip onClick={handleClick} aria-describedby={id}
                                      label={user.name ? user.name : ''} color={'#ffffff'}
                                      avatar={<Avatar src={user.avatar ? user.avatar : ''}/>}/>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    elevation={2}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Box
                                        width={'100%'}
                                        p={1}
                                        display={'flex'}
                                        flexDirection={'column'}
                                    >
                                        <Button
                                            onClick={() => handleMyProfile()}
                                            color={"primary"}
                                        >
                                            {"My Profile"}
                                        </Button>
                                        <Button
                                            onClick={() => handleLogout()}
                                            color={"primary"}
                                        >
                                            {"Log Out"}
                                        </Button>
                                    </Box>
                                </Popover>
                            </Box>
                        </Grid>
                    </Grid>
                    <UserDialog refresh={() => {
                    }} open={userOpen} userId={user._id} title={'My Profile'}
                                handleClose={() => setUserOpen(false)}/>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    onDrawerToggle: PropTypes.func.isRequired,
    title: PropTypes.string,
};

export default withStyles(styles)(Header);