import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import OptionCard from "../../../attend-exam/[id]/components/option_card";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ConfirmDialog from "../../../../src/components/confirm/ConfirmDialog";
import {removeQuestion} from "../../../../src/apis/exam_questions";
import {useSnackbar} from "notistack";
import {CircularProgress} from "@material-ui/core";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description organ_question_card.js
 * @createdOn 24/06/21 9:42 am
 */


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    clickable: {
        cursor: "pointer",
        userSelect: "none",
    },
    deleteButton: {
        // position: 'absolute',
        // right: theme.spacing(1),
        // top: theme.spacing(1),
        // color: theme.palette.grey[500],
    },
}));


const OrganQuestionCard = ({question, index, onDelete}) => {

        const classes = useStyles();
        const {enqueueSnackbar} = useSnackbar();
        const [deleteOpen, setDeleteOpen] = useState(false);
        const [loading, setLoading] = useState(false);

        useEffect(() => {
        }, [index]);


        const handleQuestionDelete = () => {
            setDeleteOpen(false);
            setLoading(true);
            removeQuestion(question._id).then((res) => {
                onDelete(index);
            }).catch((error) => {
                enqueueSnackbar(error.message ? error.message : 'Something went wrong!', {variant: 'error'});
            }).finally(() => {
                setLoading(false);
            });
        }


        return (
            <Box data-aos="zoom-out"
                 data-aos-duration="300" display={'flex'} alignItems={'flex-start'} justifyContent={'center'}
                 flexDirection={'column'}
                 boxShadow={'2px 2px 6px rgba(18, 73, 84, 0.15)'}
                 bgcolor={'#ffffff'} p={3} mt={5}
                 borderRadius={3}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                    <Typography data-aos="fade-right"
                                data-aos-duration="400" variant="h3">
                        Q{index + 1} : {question.question}
                    </Typography>
                    <Box data-aos="fade-left"
                         data-aos-duration="400">
                        {
                            loading ? <CircularProgress size={20}/> :
                                <IconButton className={classes.deleteButton} onClick={() => setDeleteOpen(true)}>
                                    <DeleteOutlineIcon fontSize="default"/>
                                </IconButton>
                        }
                    </Box>
                    <ConfirmDialog show={deleteOpen} dismiss={() => setDeleteOpen(false)} title={'Delete draft'}
                                   proceed={handleQuestionDelete}
                                   confirmation={'Are you sure to delete this question?'} okLabel={'yes'}/>
                </Box>
                <Box m={1}/>
                {
                    question.options.map((e, i) => {
                        return (
                            <OptionCard
                                option={e}
                                isSelected={question.length === 0 ? false : question.answer[0] === e}
                                onClick={() => {
                                }}
                            />
                        )
                    })
                }
            </Box>
        );
    }
;

export default OrganQuestionCard;
