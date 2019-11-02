import {SEND_SOS_API} from '../Utils/Constants';
import axios from 'axios';

export const APISendSOS = async (phoneNumber, longitude, latitude) => {
  try {
    let response = await axios
      .post(SEND_SOS_API, {
        phone: phoneNumber,
        message: 'Help me',
        longitude: longitude,
        latitude: latitude,
        type: 2,
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
