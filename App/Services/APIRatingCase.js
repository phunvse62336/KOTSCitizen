import {RATING_CASE_API} from '../Utils/Constants';
import axios from 'axios';

export const APIRatingCase = async (id, rate, message) => {
  try {
    let response = await axios
      .post(RATING_CASE_API, {
        caseId: id,
        rate: rate,
        notice: message,
      })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
        return {result: 3000, data: null};
      });
    return response;
  } catch (e) {
    console.log('ERROR' + e.message);
    return {result: 3000, data: null};
  }
};
