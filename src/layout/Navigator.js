import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {withStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import Link from "../../src/Link";
import {useRouter} from "next/router";
import Logo from '../../src/asset/drawerLogo.svg'
import {Box} from "@material-ui/core";
import {useStore} from "laco-react";
import userStore from "../store/userStore";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description Navigator.js
 * @createdOn 27/06/21 9:23 pm
 */



const styles = (theme) => ({
    categoryHeader: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
        color: theme.palette.common.black,
    },
    item: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),

        color: theme.palette.text.primary,
    },
    itemCategory: {
        backgroundColor: "#232f3e",
        boxShadow: "0 -1px 0 #404854 inset",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    firebase: {
        fontSize: 24,
        color: theme.palette.common.white,
    },
    itemActiveItem: {
        backgroundColor: '#00000025',
        '&:hover': {
            backgroundColor: "#00000035",
        }
    },
    itemPrimary: {
        fontSize: "inherit",
        textAlign: 'left',
        marginLeft: theme.spacing(2),
        color: '#ffffff'
    },
    itemIcon: {
        minWidth: "auto",
        marginRight: theme.spacing(2),
        color: '#ffffff'
    },
    divider: {
        color: '#ffffff'
        // marginTop: theme.spacing(2),
        // marginBottom: theme.spacing(2),
    },
    logoBg: {
        // opacity: 0.25,
        cursor: 'pointer',
        userSelect: 'none',
    }
});

function Navigator(props) {
    const {classes, ...other} = props;

    const Router = useRouter();
    const {user} = useStore(userStore);

    const organOptions = [
        {
            id: "Dashboard",
            icon: <DnsRoundedIcon color={'#ffffff'}/>,
            active: Router.pathname === "/organ-dashboard",
            href: "/organ-dashboard",
        },
        {
            id: "Drafts",
            icon: <DnsRoundedIcon color={'#ffffff'}/>,
            active: Router.pathname === "/organ-drafts",
            href: "/organ-drafts",
        },
        {
            id: "Exams",
            icon: <DnsRoundedIcon color={'#ffffff'}/>,
            active: Router.pathname === "/organ-exams",
            href: "/organ-exams",
        },
        {
            id: "Practice Sets",
            icon: <DnsRoundedIcon color={'#ffffff'}/>,
            active: Router.pathname === "/organ-practice-sets",
            href: "/organ-practice-sets",
        },
    ]
    const adminOptions = [
        {
            id: "Dashboard",
            icon: <DnsRoundedIcon color={'#ffffff'}/>,
            active: Router.pathname === "/admin-dashboard",
            href: "/admin-dashboard",
        },
        {
            id: "Pending Requests",
            icon: <DnsRoundedIcon color={'#ffffff'}/>,
            active: Router.pathname === "/admin-requests",
            href: "/admin-requests",
        },
        {
            id: "Exam Tags",
            icon: <DnsRoundedIcon color={'#ffffff'}/>,
            active: Router.pathname === "/admin-tags",
            href: "/admin-tags",
        },
    ]

    const options = user["role"] === 2 ? organOptions : adminOptions;

    return (

        <Drawer variant="permanent" {...other} >
            <List disablePadding>
                <Box
                    width={'100%'}
                    bgcolor={'#FBCBD785'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    py={3}
                    className={classes.logoBg}
                >
                    <img width={'80%'} src={Logo}
                         onClick={() => Router.push(user["role"] === 2 ? "/organ-dashboard" : "admin-dashboard")}/>
                </Box>
                <React.Fragment>
                    {options.map(({id: childId, icon, active, href}) => (
                        <React.Fragment key={childId}>
                            <ListItem
                                key={childId}
                                button
                                className={clsx(classes.item, active && classes.itemActiveItem)}
                                component={Link}
                                href={href}
                                as={href}
                                style={{
                                    textDecoration: "none",
                                    height: 40,
                                }}
                            >
                                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                                <ListItemText
                                    classes={{
                                        primary: classes.itemPrimary,
                                    }}
                                >
                                    {childId}
                                </ListItemText>
                            </ListItem>
                            <Divider color={'#ffffff'} className={classes.divider}/>
                        </React.Fragment>
                    ))}
                </React.Fragment>
            </List>
        </Drawer>
    )
        ;
}

Navigator.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);