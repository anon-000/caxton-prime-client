/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description exams.js
 * @createdOn 29/06/21 6:42 pm
 */
import {examService, resultService} from "../config/endpoints";


export const getAllExams = ($skip, $limit, $search) => examService.find({
    query: {
        $skip,
        $limit,
        $sort: {createdAt: -1},
        // $or: [
        //     {title: {$search}},
        //     {description: {$search}},
        //     {'examTags': {$search}}
        // ]
        // $search
    }
});


export const getExamDetails = (id) => examService.get(id, {
    query: {
        $populate: 'examTags'
    }
});


export const createDraft = (data) => examService.create(data);


export const examPatch = (id, body) => {
    console.log("id" , id);
    return  examService.patch(id, body)
};
