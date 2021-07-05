import {makeStyles} from "@material-ui/core/styles";
import {useRouter} from "next/router";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 04/07/21 5:22 am
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

const DraftDetails = () => {
    const Router = useRouter();
    const {id} = Router.query;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            Draft Details {id}
        </div>
    )
}


export default DraftDetails
