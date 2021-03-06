import {resultService} from "../config/endpoints";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description results.js
 * @createdOn 04/07/21 12:27 am
 */




export const getAllResults = ($skip, $limit, $search, userId) => resultService.find({
    query: {
        $skip,
        $limit,
        createdBy: userId,
        $populate: ["studentAnswer.question", "exam"],
        $sort: {createdAt: -1},
        'examTitle': {$search}
        // $search
    }
});

export const getAllResultsOfExam = ($skip, $limit, $search, examId) => resultService.find({
    query: {
        $skip,
        $limit,
        exam: examId,
        $populate: ["studentAnswer.question", "exam", 'createdBy'],
        $sort: {createdAt: -1},
        'examTitle': {$search}
        // $search
    }
});


export const submitExamAnswer = (data) => resultService.create(data);


export const deleteResult = (id) => resultService.remove(id);
