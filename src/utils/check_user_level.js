import {useRouter} from "next/router";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description check_user_level.js
 * @createdOn 04/07/21 1:11 pm
 */






function CheckUserLevel(user) {
    const Router = useRouter();
    console.log("------------------------");
    if (user.role === 1) {
        Router.replace("/student-dashboard");
    } else if (user.role === 2) {
        Router.replace("/organ-dashboard");
    } else if (user.role === 3) {
        Router.replace("/admin-dashboard");
    }
}


export default CheckUserLevel