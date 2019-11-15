import {ALERT_DANGEROUS_STREET_API} from '../Utils/Constants';
import axios from 'axios';

export const APIAlertDangerousStreet = async phoneNumber => {
  try {
    let response = await axios
      .post(ALERT_DANGEROUS_STREET_API, {
        phone: phoneNumber,
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
    console.log('ERROR' + e.message);
    return {result: 3000, data: null};
  }
};
