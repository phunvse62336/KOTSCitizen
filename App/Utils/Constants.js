export const MESSAGES = {
  CODE: {
    SUCCESS_CODE: 200,
    FAILED_CODE: 3000,
  },
  CASE: {
    CREATE: 0,
    CONFIRM: 1,
    SUCCESSED: 2,
    FAILED: 3,
    PENDING: 4,
  },
  ROLE: {
    CITIZEN: 1,
    KNIGHT: 2,
  },
  TYPE_CASE: {
    SOS: 1,
    NORMAL: 2,
  },
};

export const NOTIFICATION_CHANNEL = 'kots-channel';

export const BASE_URL = 'https://kots.herokuapp.com/api/';

export const SEND_SOS_API = BASE_URL + 'sendCase';

export const FIND_USER_API = BASE_URL + 'findUser';

export const CREATE_CITIZEN_PROFILE = BASE_URL + 'createProfile';

export const UPDATE_CITIZEN_PROFILE = BASE_URL + 'updateProfile';

export const GET_NEWS = BASE_URL + 'getNews';

export const GET_POLICECONTACT = BASE_URL + 'getPoliceContact';

export const GET_CASE_API = BASE_URL + 'getCase';

export const LOGIN_API = BASE_URL + 'login';

export const REMOVE_TOKEN_API = BASE_URL + 'removeToken';

export const SEND_FEEDBACK_API = BASE_URL + 'sendFeedback';
