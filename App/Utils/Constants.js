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
