import app from "./index";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description users
 * @createdOn 16/05/21 20:36
 */



export const UserService = app.service("users");


export const getAllUsers = (skip = 0) => UserService.find({
    query: {
        $skip: skip
    }
});

export const signUp = (name, email, password, role) => UserService.create({
    name,
    email,
    password,
    role,
});

export const userPatch = (id, body) => {
    console.log("id" , id);
   return  UserService.patch(id, body)
};



