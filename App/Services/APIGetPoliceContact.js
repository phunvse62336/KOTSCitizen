import {GET_POLICECONTACT} from '../Utils/Constants';
import axios from 'axios';

export const APIGetPoliceContact = async () => {
  try {
    let response = await axios
      .get(GET_POLICECONTACT)
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
