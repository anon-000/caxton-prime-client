import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Header from './Header';
import {useRouter} from 'next/router';
import Navigator from "./Navigator";
import Hidden from "@material-ui/core/Hidden";
import {useStore} from "laco-react";
import userStore from "../store/userStore";
import AdOrgHeader from "./AdOrgHeader";
import Box from "@material-ui/core/Box";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description Layout.js
 * @createdOn 27/06/21 9:23 pm
 */


const drawerWidth = 256;

const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    app: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        flex: 1,
        // padding: theme.spacing(1, 4),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        background: '#ffffff',
        // backgroundImage: `url(${BackImg})`,
        // backgroundPosition: 'bottom center',
        // backgroundRepeat: 'no-repeat',
        // backgroundAttachment: 'fixed',
        // backgroundSize: '100%',
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(6, 1),
            // backgroundImage: `url(${BackImgMob})`,
            // backgroundSize: 'cover',
            // backgroundPosition: 'center',
        }
    },
    footer: {
        padding: theme.spacing(2),
        background: '#eaeff1',
    },
    drawerBg: {
        backgroundColor: '#F03D5F'
    }
}));

function Layout({children, title}) {
    const classes = useStyle();
    const Router = useRouter();
    const {user} = useStore(userStore);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // const {user} = useStore(UserStore);
    //
    // useEffect(() => {
    //     if (!user) {
    //         Router.push('/login');
    //     }
    // }, []);
    //
    // if (!user) return <Loader/>;

    return (
        <div className={classes.root}>
            <CssBaseline/>
            {
                user["role"] === 1 ? <Box/> : <nav className={classes.drawer}>
                    <Hidden smUp implementation="js">
                        <Navigator
                            PaperProps={{style: {width: drawerWidth}}}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                        />
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Navigator PaperProps={{style: {width: drawerWidth, backgroundColor: '#F03D5F'}}}/>
                    </Hidden>
                </nav>
            }
            <div className={classes.app}>
                {
                    user["role"] === 1 ? <Header onDrawerToggle={handleDrawerToggle} title={title}/> :
                        <AdOrgHeader onDrawerToggle={handleDrawerToggle} title={title}/>
                }
                {/*<Header onDrawerToggle={handleDrawerToggle} title={title} />*/}
                <main className={classes.main}>
                    {children}
                </main>
                {/*<footer className={classes.footer}>*/}
                {/*    /!*<Copyright />*!/*/}
                {/*</footer>*/}
            </div>
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.any.isRequired,
    title: PropTypes.string,
};

export default Layout;