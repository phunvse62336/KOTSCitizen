import {FIND_USER_API} from '../Utils/Constants';
import axios from 'axios';

export const APIFindUser = async phoneNumber => {
  try {
    let response = await axios
      .post(FIND_USER_API, {
        phone: phoneNumber,
        role: 1,
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
    console.log(e.message);
    return {result: 3000, data: null};
  }
};
