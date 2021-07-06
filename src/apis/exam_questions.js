/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description exam_questions.js
 * @createdOn 02/07/21 12:38 am
 */

import { questionsService} from "../config/endpoints";


export const getAllQuestions = (id) => questionsService.find({
    query: {
        "exam": id,
        // $or: [
        //     {title: {$search}},
        //     {description: {$search}},
        //     {'examTags': {$search}}
        // ]
        // $search
    }
});


export const createQuestion = (data) => questionsService.create(data);
