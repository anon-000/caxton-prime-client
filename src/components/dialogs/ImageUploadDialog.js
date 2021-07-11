/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description ImageUploadDialog.js
 * @createdOn 11/07/21 11:57 am
 */



import {makeStyles} from '@material-ui/styles';
import React, {useState} from 'react';
import {useSnackbar} from 'notistack';
import {uploadFile} from '../../config/endpoints';
import {
    Box,
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CropperDialog from "../cropper/Cropper";

const useStyles = makeStyles((theme) => ({
    mainIconDiv: {
        padding: theme.spacing(1),
    },
    iconDiv: {
        backgroundColor: '#EEF7FF',
        width: 320,
        height: 320,
        borderRadius: theme.shape.borderRadius,
    },
    icon: {
        height: '40%',
        width: 'auto',
        color: theme.palette.primary.main,
    },
    imagePreview: {
        height: 320,
        width: 320,
    },
    container: {
        position: 'relative',
        height: 320,
        width: 320,
    },
    imageContainer: {
        position: 'absolute',
    },
    deleteIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 99,
    },
    nextButton: {
        marginTop: theme.spacing(2),
    },
    withBorder: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        padding: 4,
        borderRadius: 4,
    },
    withOutBorder: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid #fff',
        cursor: 'pointer',
        padding: 4,
    },
}));

const ImageUploadDialog = ({openDialog, setOpenDialog, setAvatar, setAvatarEdited}) => {

    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [src, setSrc] = useState();
    const [show, setShow] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [edited, setEdited] = useState(false);

    const dataURLtoFile = (dataUrl, filename) => {
        let arr = dataUrl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const handleSave = async () => {
        let _logo = image;
        setLoading(true);
        if (edited) {
            console.log(imageFile);
            await uploadFile(imageFile).then((response) => {
                console.log(response);
                const { result, files } = response;
                if (!result) {
                    enqueueSnackbar('File upload error.', { variant: 'error' });
                    return null;
                } else {
                    enqueueSnackbar('File upload Successfully.', { variant: 'success' });
                    setAvatar(files[0]);
                }
                _logo = files[0];
            }).finally(() => {
                setLoading(false);
                setOpenDialog(false);
                //setAvatarEdited(true);
            });
        }
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <div>
                <Dialog aria-labelledby="form-dialog-title" onClose={handleClose} open={openDialog}>
                    <DialogTitle onClose={handleClose}>
                        <Typography>
                            {'Choose Image'}
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        {image !== '' ? (
                            <Box className={classes.container} onClick={() => setShow(true)}>
                                <div className={classes.deleteIcon}>
                                    <IconButton color={'primary'}>
                                        <CancelIcon
                                            onClick={() => {
                                                setImage('');
                                                setSrc('');
                                                setEdited(true);
                                            }}
                                        />
                                    </IconButton>
                                </div>
                                <Box className={classes.imageContainer}>
                                    <img alt={'image'} className={classes.imagePreview} src={image} />
                                </Box>
                            </Box>
                        ) : (
                            <Box
                                alignItems="center"
                                className={classes.iconDiv}
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                onClick={() => setShow(true)}
                            >
                                <CloudUploadIcon className={classes.icon} />
                                <Typography variant={'body2'}>
                                    {'Click To Upload your image'}
                                </Typography>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={handleClose} style={{fontSize: '15px', fontWeight: '600', textTransform: 'none'}}>
                            {'Cancel'}
                        </Button>
                        <Button
                            color="primary"
                            disabled={image === '' || loading}
                            onClick={handleSave}
                            variant={'contained'}
                            style={{fontSize: '15px', fontWeight: '600', textTransform: 'none'}}
                        >
                            {loading ? (
                                <CircularProgress color={'primary'} size={24} />
                            ) : (
                                'Upload'
                            )}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <CropperDialog
                aspectRatio={16 / 16}
                cancel={() => {
                    setShow(false);
                    setSrc(null);
                }}
                cancelLabel={'Cancel'}
                dismiss={() => {
                    setShow(false);
                }}
                okLabel={'Save'}
                onCropped={(data) => {
                    setShow(false);
                    setImage(data);
                    setEdited(true);
                    setImageFile(dataURLtoFile(data, 'imageToUpload.png'));
                }}
                onSelected={(s) => {
                    setSrc(s);
                }}
                show={show}
                src={src}
                // themeColors={themeColors}
            />
        </>
    );
};

export default ImageUploadDialog;