import {UPDATE_CITIZEN_PROFILE} from '../Utils/Constants';
import axios from 'axios';

export const APIUpdateCitizenProfile = async (
  phoneNumber,
  name,
  address,
  gender,
  dateOfBirth,
) => {
  try {
    console.log(phoneNumber);
    let response = await axios
      .post(UPDATE_CITIZEN_PROFILE, {
        phone: phoneNumber,
        name: name,
        address: address,
        gender: gender,
        dateOfBirth: dateOfBirth,
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
