import { Store } from 'laco';

const userStore = new Store({
    user: null,
    token: ''
}, 'user');

export default userStore;
