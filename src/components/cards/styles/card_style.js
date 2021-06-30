/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description card_style.js
 * @createdOn 29/06/21 7:10 pm
 */


import {
    blackColor,
    whiteColor,
    hexToRgb,
} from '../../../../public/assets/jss/nextjs-material-dashboard';

const cardStyle = {
    card: {
        border: "0",
        marginBottom: "30px",
        marginTop: "30px",
        borderRadius: "15px",
        color: "rgba(" + hexToRgb(blackColor) + ", 0.87)",
        background: whiteColor,
        width: "90%",
        boxShadow: '1px 1px 3px rgba(18, 73, 84, 0.15)',
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minWidth: "0",
        wordWrap: "break-word",
        fontSize: ".875rem",
    },
    cardPlain: {
        background: "transparent",
        boxShadow: "none",
    },
    cardProfile: {
        marginTop: "30px",
        textAlign: "center",
    },
    cardChart: {
        boxShadow: '2px 2px 6px rgba(18, 73, 84, 0.15)',
        "& p": {
            marginTop: "0px",
            paddingTop: "0px",
            // boxShadow: '2px 2px 6px rgba(18, 73, 84, 0.15)',
        },
    },
    cardTable: {
        width: '100%'
    }
};

export default cardStyle;