import app from "./index";
import {examService, resultService} from "../config/endpoints";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description results.js
 * @createdOn 04/07/21 12:27 am
 */




export const getAllResults = ($skip, $limit, $search) => resultService.find({
    query: {
        $skip,
        $limit,
        $populate: ["studentAnswer.question", "exam"],
        $sort: {createdAt: -1},
        // $or: [
        //     {title: {$search}},
        //     {description: {$search}},
        //     {'examTags': {$search}}
        // ]
        // $search
    }
});


export const submitExamAnswer = (data) => resultService.create(data);
