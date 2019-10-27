import {GET_POLICECONTACT} from '../Utils/Constants';

export const APIGetPoliceContact = async () => {
  try {
    let response = await fetch(GET_POLICECONTACT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let responseJson = await response.json();
    console.log(responseJson);

    return responseJson;
  } catch (e) {
    console.log('ERROR' + e.message);
    return {result: 3000, data: null};
  }
};
