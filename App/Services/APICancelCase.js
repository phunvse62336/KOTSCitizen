import {CANCEL_CASE_API} from '../Utils/Constants';
import axios from 'axios';

export const APICancelCase = async (caseId, status) => {
  try {
    let response = await axios
      .post(CANCEL_CASE_API, {
        caseId: caseId,
        status: status,
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
