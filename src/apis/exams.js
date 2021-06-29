/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description exams.js
 * @createdOn 29/06/21 6:42 pm
 */
import {examService} from "../config/endpoints";


export const getAllExams = ($skip, $limit, $search) => examService.find({
    query: {
        $skip,
        $limit,
        // $or: [
        //     {title: {$search}},
        //     {description: {$search}},
        //     {'examTags': {$search}}
        // ]
        // $search
    }
});
