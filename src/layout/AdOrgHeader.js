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


// import SelectedAccountStore from '../store/selectedAccountStore';


/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description AdOrgHeader.js
 * @createdOn 09/07/21 3:28 am
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

function AdOrgHeader(props) {
    const {classes, onDrawerToggle, title} = props;
    const {user} = useStore(UserStore);
    const Router = useRouter();
    const [current, setCurrent] = useState('');
    // const { account } = useStore(SelectedAccountStore);
    // const [selectedChip, setSelectedChip] = useState();

    // const [accounts, setAccounts] = useState(user.accounts ? user.accounts : '');

    // const [openSwitchAccount, setOpenSwitchAccount] = useState(false);


    useEffect(() => {
        if (Router.route === '/organ-dashboard' || Router.route === '/admin-dashboard') {
            setCurrent('Dashboard');
        } else if (Router.route === '/organ-practice-sets') {
            setCurrent('Practice Sets');
        } else if (Router.route === '/organ-exams') {
            setCurrent('Exams');
        } else if (Router.route === '/organ-drafts') {
            setCurrent('Drafts');
        } else if (Router.route === '/admin-requests') {
            setCurrent('Pending Requests');
        } else if (Router.route === '/admin-tags') {
            setCurrent('Exam Tags');
        } else if (Router.route === '/admin-users') {
            setCurrent('All Users');
        } else if (Router.route === '/admin-drafts') {
            setCurrent('Drafts');
        } else if (Router.route === '/admin-exams') {
            setCurrent('Exams');
        } else if (Router.route === '/admin-sets') {
            setCurrent('Practice sets');
        } else {
            setCurrent('');
        }
    }, [onDrawerToggle]);


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

    // const selectAccountHandler = (acc) => {
    //     setSelectedChip(acc);
    // };

    // const saveHandler = () => {
    //     console.log(typeof selectedChip);
    //     localStorage.setItem('selectedAccount', selectedChip);
    //     SelectedAccountStore.set(() => ({ account: selectedChip }), 'account');
    //     window.location.reload();
    //     setOpenSwitchAccount(false);
    // };

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
                        <Box m={1}>
                            <Typography variant="h5">
                                {current}
                            </Typography>
                        </Box>

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
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

AdOrgHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    onDrawerToggle: PropTypes.func.isRequired,
    title: PropTypes.string,
};

export default withStyles(styles)(AdOrgHeader);