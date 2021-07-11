import Box from "@material-ui/core/Box";
import {Avatar, Badge} from "@material-ui/core";
import Vector from "../../../src/asset/photo_icon.svg"
import makeStyles from "@material-ui/core/styles/makeStyles";


/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description select_avatar
 * @createdOn 14/05/21 22:54
 */


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        width: '80%',
        maxHeight: 435,
    },
    label: {
        color: "#757575",
        paddingBottom: '7px',
        paddingTop: '10px',
        paddingRight: '16px',
        paddingLeft: '16px',
    },
    menu: {
        width: '200px'
    },
    clickable: {
        cursor: "pointer",
        userSelect: "none",
    },
    paddingX: {
        paddingRight: '16px',
        paddingLeft: '16px',
    },
    marginX: {
        padding: `${theme.spacing(3)}`,
    },
    shadow: {
        width: '29vw',
        boxShadow: "2px 2px 6px rgba(18, 73, 84, 0.15)",
        //position: 'fixed',
        margin: '100px 30px',
        '@media (max-width:1050px)': {
            margin: '50px 30px',
            width: '29vw',
        },
        '@media (max-width:900px)': {
            margin: '50px 0px',
            width: '100vw',
        },
        '@media (max-width:500px)': {
            margin: '50px 0px',
            width: '100%',
        },
    },
    fullWidth: {
        width: '100%'
    }
}));


const SelectAvatar = ({onClick, avatar}) => {
    const classes = useStyles();

    return (
        <Box onClick={onClick} className={classes.clickable}>
            <Badge
                overlap="circle"
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                badgeContent={<Avatar alt="" src={Vector}/>}>
                <Avatar alt="Caxton" style={{height: 100, width: 100}}
                        src={avatar}/>
            </Badge>

        </Box>
    )
}


export default SelectAvatar