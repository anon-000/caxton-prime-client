import {makeStyles} from "@material-ui/core/styles";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 04/07/21 5:00 am
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
}));

const AdminTags = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            Admin Exam tags
        </div>
    )
}

export default AdminTags
