import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { useRouter } from 'next/router';
import Loader from '../src/components/Loader';
import app, { cookieStorage } from '../src/apis/index';
import {SnackbarProvider} from 'notistack';


export default function MyApp(props) {
  const { Component, pageProps } = props;
  const Router = useRouter();

  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    console.log('app useEffect called');
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    const token = localStorage.getItem('feathers-jwt');
    console.log("token",token);
    if (token) {
      app
        .authenticate({
          strategy: 'jwt',
          accessToken: token
        })
        .then(response => {
          const { accessToken, user } = response;
          console.log('app accesstoken',accessToken, user);
          localStorage.setItem('feathers-jwt', accessToken);
          userStore.set(() => ({ token: accessToken, user }), 'login');
          if (Router.pathname === '/login') {
            Router.replace('/').then(() => {
              setLoading(false);
            });
          } else {
            setLoading(false);
          }
        })
        .catch(() => {
          console.log('catch method called');
          // app.logout();
          // localStorage.removeItem('feathers-jwt');
          // Router.replace('/').then(() => {
            setLoading(false);
          // });
        });
    } else {
      setLoading(false);
      // if (Router.pathname !== '/login') {
      //   Router.replace('/login').then(() => {
      //     setLoading(false);
      //   });
      // } else {
      //   setLoading(false);
      // }
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {
            loading ?
              <Loader /> :
              <Component {...pageProps} />
          }
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};