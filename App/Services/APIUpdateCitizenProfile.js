import {UPDATE_CITIZEN_PROFILE} from '../Utils/Constants';

export const APIUpdateCitizenProfile = async (
  phoneNumber,
  name,
  address,
  gender,
) => {
  try {
    console.log(phoneNumber);
    let response = await fetch(UPDATE_CITIZEN_PROFILE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phoneNumber,
        name: name,
        address: address,
        gender: gender,
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
