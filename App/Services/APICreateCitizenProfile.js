import {CREATE_CITIZEN_PROFILE} from '../Utils/Constants';

export const APICreateCitizenProfile = async (phoneNumber, citizenToken) => {
  try {
    console.log(phoneNumber + ',' + citizenToken);
    let response = await fetch(CREATE_CITIZEN_PROFILE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phoneNumber,
        role: '1',
        token: citizenToken,
      }),
    });
    let responseJson = await response.json();
    console.log(responseJson);

    return responseJson;
  } catch (e) {
    console.log(e.message);
    return {result: 3000, data: null};
  }
};
