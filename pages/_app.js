import React, {useState} from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import {ThemeProvider} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import {useRouter} from "next/router";
import Loader from "../src/components/Loader";
import app, {cookieStorage} from "../src/apis/index";
import {SnackbarProvider} from "notistack";
import userStore from "../src/store/userStore";
import DefaultLayout from "../src/layout/Layout";

const Noop = ({children}) => children;

export default function MyApp(props) {
    const {Component, pageProps} = props;
    const Router = useRouter();

    const [loading, setLoading] = useState(true);

    let Layout = DefaultLayout;

    if (typeof Component.Layout !== 'undefined') {
        Layout = Component.Layout ? Component.Layout : Noop;
    }

    React.useEffect(() => {
        console.log("app useEffect called");
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        const token = localStorage.getItem("feathers-jwt");

        console.log("token", token);
        setLoading(true);
        if (token) {
            app
                .authenticate({
                    strategy: "jwt",
                    accessToken: token,
                })
                .then((response) => {
                    const {accessToken, user} = response;
                    console.log("app accesstoken", accessToken, user);
                    localStorage.setItem("feathers-jwt", accessToken);
                    userStore.set(() => ({token: accessToken, user}), "user");

                    if (user["role"] === 1) {
                        /// user
                        console.log("role 1", user["userName"], user["phone"]);
                        if (!user["userName"] || !user["phone"]) {
                            Router.replace("/student-onboarding").then(() => {
                                setLoading(false);
                            });
                        } else {
                            // Router.replace("/student-dashboard").then(() => {
                            //   setLoading(false);
                            // });
                            setLoading(false);
                        }
                    } else if (user["role"] === 2) {
                        /// organization
                        console.log("role 2", user["userName"], user["phone"]);
                        if (!user["phone"] || !user["address"]) {
                            Router.replace("/organization-onboarding").then(() => {
                                setLoading(false);
                            });
                        } else if (user["status"] === 1) {
                            Router.replace("/organ-request-pending").then(() => {
                                setLoading(false);
                            });
                        } else {
                            setLoading(false);
                        }
                    } else if (user["role"] === 3) {
                        /// admin
                        console.log("role 3", user["userName"], user["phone"]);
                        setLoading(false);
                    }
                })
                .catch(async () => {
                    console.log("catch method called");
                    await app.logout();
                    localStorage.removeItem('feathers-jwt');
                    Router.replace('/login').then(() => {
                        setLoading(false);
                    });
                });
        } else {
            if (Router.pathname === "/login" || Router.pathname === "/signup" || Router.pathname === '/' || Router.pathname === '/LandingTest') {
                    setLoading(false);
            } else {
                Router.replace("/login").then(() => {
                    setLoading(false);
                });
            }
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Caxton Prime</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={3}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline/>
                    {loading ? <Loader/> : <Layout title={Component.title ? Component.title : ''}>
                        <Component {...pageProps} />
                    </Layout>}
                </SnackbarProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
