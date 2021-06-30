import {examService, tagsService} from "../config/endpoints";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description tags.js
 * @createdOn 01/07/21 1:49 am
 */


export const getAllTags = () => tagsService.find();
