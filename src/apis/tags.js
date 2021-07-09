import {examService, tagsService} from "../config/endpoints";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description tags.js
 * @createdOn 01/07/21 1:49 am
 */


export const getAllTags = () => tagsService.find({
    query: {
        $skip: 0,
        $limit: 30,
        $sort: {createdAt: -1},
    }
});


export const createTag = (data) => tagsService.create(data);

export const deleteTag = (id) => tagsService.remove(id);


export const getTags = ($skip, $limit, $search) => tagsService.find({
    query: {
        $skip,
        $limit,
        $sort: {createdAt: -1},
        $or: [
            {name: {$search}},
        ]
        // $search
    }
});