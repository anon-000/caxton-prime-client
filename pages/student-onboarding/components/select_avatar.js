import Box from "@material-ui/core/Box";
import {Avatar, Badge} from "@material-ui/core";
import Vector from "../../../src/asset/photo_icon.svg"


/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description select_avatar
 * @createdOn 14/05/21 22:54
 */



const SelectAvatar = () => {
    return (
        <Box>
            <Badge
                overlap="circle"
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                badgeContent={<Avatar alt="" src={Vector}/>}>
                <Avatar alt="Caxton" style={{height: 100, width: 100}}
                        src={'https://test.smarttersstudio.com/images/team/7.png'}/>
            </Badge>
        </Box>
    )
}


export default SelectAvatar