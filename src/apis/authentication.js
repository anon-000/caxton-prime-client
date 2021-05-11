import app from './index';

export const authenticate = (email, password) => app.authenticate({
    strategy: 'email',
    email,
    password
});

export const logout = app.logout;
