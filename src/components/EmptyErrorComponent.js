/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description EmptyErrorComponent.js
 * @createdOn 02/07/21 9:55 am
 */


import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const EmptyErrorComponent = ({txt, btnText, onClick}) => {

    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
            <Typography variant="h3">
                {txt}
            </Typography>
            <Box m={1} />
            <Button color="primary" variant="contained" onClick={onClick} >
                {btnText}
            </Button>
        </Box>
    )
}

export default EmptyErrorComponent