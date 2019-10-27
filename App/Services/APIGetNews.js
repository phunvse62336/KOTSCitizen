import {GET_NEWS} from '../Utils/Constants';

export const APIGetNews = async () => {
  try {
    let response = await fetch(GET_NEWS, {
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
