import app from './index';

export const authenticate = (email, password) => app.authenticate({
    strategy: 'local',
    email,
    password
});

export const logout = app.logout;
