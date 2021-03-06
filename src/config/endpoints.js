/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description endpoints.js
 * @createdOn 29/06/21 6:55 pm
 */


import app from "../apis";




export const userService = app.service('users');
export const examService = app.service('exams');
export const uploadService = app.service('upload');
export const tagsService = app.service('exam-tag');
export const questionsService = app.service('questions');
export const resultService = app.service('student-results');



export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('uri[]', file);
    formData.append('folderName', 'CaxtonPrime');
    return uploadService.create(formData, {headers: {'Authorization': `Bearer ${localStorage.getItem('feathers-jwt')}`}});
};