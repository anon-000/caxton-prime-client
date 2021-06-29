/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 29/06/21 3:27 pm
 */


import ConfirmDialog from './confirmDialog';
import {createConfirmation} from 'react-confirm';

const confirm = createConfirmation(ConfirmDialog);

/**
 *
 * @param title {string}
 * @param message {string}
 * @param okLabel {string}
 * @param options {{}}
 * @returns {*}
 * @constructor
 */
const Confirm = (title, message, okLabel, options = {}) =>
    confirm({...options, title, confirmation: message, okLabel});

export default Confirm;