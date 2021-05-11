import { Store } from 'laco';

const UserStore = new Store({
    user: null,
    token: ''
}, 'user');

export default UserStore;
