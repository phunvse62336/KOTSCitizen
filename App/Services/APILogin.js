import {LOGIN_API} from '../Utils/Constants';
import axios from 'axios';

export const APILogin = async (phoneNumber, token) => {
  try {
    let response = await axios
      .post(LOGIN_API, {
        phone: phoneNumber,
        token: token,
      })
      .then(res => {
        console.log(res);
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
