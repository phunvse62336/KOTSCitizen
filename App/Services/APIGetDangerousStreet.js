import {GET_DANGEROUS_STREET_API} from '../Utils/Constants';
import axios from 'axios';

export const APIGetDangerousStreet = async () => {
  try {
    let response = await axios
      .get(GET_DANGEROUS_STREET_API)
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
