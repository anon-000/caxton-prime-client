import app from "./index";
import {examService, userService} from "../config/endpoints";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description users
 * @createdOn 16/05/21 20:36
 */



export const UserService = app.service("users");


// export const getAllUsers = (skip = 0) => UserService.find({
//     query: {
//         $skip: skip
//     }
// });

export const signUp = (name, email, password, role) => UserService.create({
    name,
    email,
    password,
    role,
});

export const userPatch = (id, body) => {
    console.log("id", id);
    return UserService.patch(id, body)
};

export const deleteUser = (id) => UserService.remove(id);
export const editUser = (id, body) => UserService.patch(id, body);



export const getAllPendingOrgans = ($skip, $limit, $search) => UserService.find({
    query: {
        $skip,
        $limit,
        role: 2,
        status: 1,
        $sort: {createdAt: -1},
        // $or: [
        //     {title: {$search}},
        //     {description: {$search}},
        //     {'examTags': {$search}}
        // ]
        // $search
    }
});


/**
 * 1. Student
 * 2. Organization
 * 3. Admin


 /**
 * 1. Not-verified in case of organization
 * 2. verified in case of organization
 */