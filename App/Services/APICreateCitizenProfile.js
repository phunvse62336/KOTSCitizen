import {CREATE_CITIZEN_PROFILE} from '../Utils/Constants';
import axios from 'axios';

export const APICreateCitizenProfile = async (phoneNumber, citizenToken) => {
  try {
    console.log(phoneNumber + ',' + citizenToken);
    let response = await axios
      .post(CREATE_CITIZEN_PROFILE, {
        phone: phoneNumber,
        role: 1,
        token: citizenToken,
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
