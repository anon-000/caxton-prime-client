/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description ConfirmDialog.js
 * @createdOn 29/06/21 3:26 pm
 */


import React from 'react';
import {confirmable} from 'react-confirm';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '../DialogTitle';
import PropTypes from 'prop-types';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../../theme';
import Typography from '@material-ui/core/Typography';

const ConfirmDialog = ({
                           okLabel,
                           cancelLabel = 'Cancel',
                           title,
                           confirmation,
                           show,
                           proceed,
                           dismiss,
                           cancel,
                           content,
                       }) => {
    return (
        <ThemeProvider theme={theme}>
            <Dialog fullWidth maxWidth="xs" onClose={dismiss} open={show}>
                <DialogTitle onClose={dismiss}>
                    <Typography style={{color: 'rgba(18, 73, 84, 0.75)'}}>
                        {title}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{color: '#124954'}}>{confirmation}</DialogContentText>
                    <Typography>{content && <DialogContentText>{content}</DialogContentText>}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={cancel} style={{fontWeight: '600', textTransform: 'none'}}>
                        {cancelLabel}
                    </Button>
                    <Button color="secondary" onClick={proceed} variant={'contained'}
                            style={{fontWeight: '600', textTransform: 'none'}}>
                        {okLabel}
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
};

ConfirmDialog.propTypes = {
    okLabel: PropTypes.any.isRequired,
    cancelLabel: PropTypes.any,
    title: PropTypes.any.isRequired,
    confirmation: PropTypes.any.isRequired,
    show: PropTypes.bool.isRequired,
    proceed: PropTypes.func.isRequired,
    dismiss: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    content: PropTypes.any,
};

export default confirmable(ConfirmDialog);