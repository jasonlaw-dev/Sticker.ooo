const TYPES = {
  REGISTER: 'REGISTER',
  FORGET_PASSWORD: 'FORGET_PASSWORD',
  RESEND_VERIFICATION: 'RESEND_VERIFICATION',
  USERNAME_OR_EMAIL_EXIST: 'USERNAME_OR_EMAIL_EXIST',
  FAILED_TO_REGISTER: 'FAILED_TO_REGISTER',
  FAILED_TO_SEND_TOKEN: 'FAILED_TO_SEND_TOKEN',
  FAILED_TO_LOGIN: 'FAILED_TO_LOGIN',
  FAILED_TO_SEND_VERIFICATION_EMAIL: 'FAILED_TO_SEND_VERIFICATION_EMAIL',
  FAILED_TO_SEND_RESET_PASSWORD_EMAIL: 'FAILED_TO_SEND_RESET_PASSWORD_EMAIL',
  FAILED_TO_GENERATE_JSON: 'FAILED_TO_GENERATE_JSON',
  FAILED_TO_VERIFY_JWT_TOKEN: 'FAILED_TO_VERIFY_JWT_TOKEN',
  FAILED_TO_GET_APP_STATUS: 'FAILED_TO_GET_APP_STATUS',
  FAILED_TO_SET_APP_STATUS: 'FAILED_TO_SET_APP_STATUS',
  VERIFICATION_EMAIL_SENT: 'VERIFICATION_EMAIL_SENT',
  RESET_PASSWORD_EMAIL_SENT: 'RESET_PASSWORD_EMAIL_SENT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGGED_OUT_SUCCESS: 'LOGGED_OUT_SUCCESS',
  GET_APP_STATUS_SUCCESS: 'GET_APP_STATUS_SUCCESS',
  SET_APP_STATUS_SUCCESS: 'SET_APP_STATUS_SUCCESS',
  ACCOUNT_VERIFIED: 'ACCOUNT_VERIFIED',
  ACCOUNT_NOT_VERIFIED: 'ACCOUNT_NOT_VERIFIED',
  ACCOUNT_NOT_MATCH_TOKEN: 'ACCOUNT_NOT_MATCH_TOKEN',
  ACCOUNT_ALREADY_BEEN_VERIFIED: 'ACCOUNT_ALREADY_BEEN_VERIFIED',
  INVALID_TOKEN: 'INVALID_TOKEN',
  INVALID_USER: 'INVALID_USER',
  UNAUTHORIZED_ACTION: 'UNAUTHORIZED_ACTION'
};

const MESSAGES = {
  USERNAME_OR_EMAIL_EXIST: 'Username or email already exists',
  IS_REQUIRE: 'is required',
  IS_ARRAY: 'is an array',
  IS_STRING: 'is a string',
  IS_NUMBER: 'is a number',
  IS_VALID_DATAURL: 'is a valid dataUrl',
  IS_UUID: 'is a valid UUID',
  IS_NOT_VALID_USERNAME: 'is not a valid username',
  PASSWORD_NOT_MATCH: 'Passwords do not match',
  VERIFY_USERNAME: 'must be within 4 to 20 characters',
  VERFIY_PASSWORD: 'must be at least 6 characters',
  VERIFY_QUERY_LIMIT: 'must be between 1 to 20',
  VERIFY_QUERY_OFFSET: 'must be non-negative',
  VERIFY_QUERY_SORT: 'must be valid sort',
  VERIFY_QUERY_ORDER: 'must be asc or desc',
  VERIFY_IMAGE: 'Image should not be larger than 100kb',
  FAILED_TO_REGISTER: 'Failed to register',
  FAILED_TO_LOGIN: 'Failed to login',
  FAILED_TO_SEND_TOKEN: 'Failed to send token',
  FAILED_TO_MATCH_USER: 'Failed to match user',
  FAILED_TO_VERIFY_ACCOUNT: 'Failed to verify the account',
  FAILED_TO_SEND_VERIFICATION_EMAIL: 'Failed to send a verification email',
  FAILED_TO_SEND_RESET_PASSWORD_EMAIL: 'Failed to send a reset password email',
  FAILED_TO_GENERATE_JSON: 'Failed to generate JSON',
  FAILED_TO_VERIFY_JWT_TOKEN: 'Failed to verify JWT Token',
  FAILED_TO_GET_APP_STATUS: 'Failed to get app status',
  FAILED_TO_SET_APP_STATUS: 'Failed to set app status',
  INVALID_TOKEN: 'Invalid Token',
  INVALID_DATAURL: 'Invalid dataUrl',
  INVALID_USER: 'Invalid user',
  ACCOUNT_VERIFIED: 'Your account has been verified',
  ACCOUNT_ALREADY_BEEN_VERIFIED: 'Your account has already been verified',
  ACCOUNT_NOT_VERIFIED: 'Something went wrong, your account cannot be not verified',
  LOGIN_SUCCESS: 'Login Successfully',
  VERIFICATION_EMAIL_SENT_SUCCESS: 'A verification email has been sent to ',
  RESET_PASSWORD_EMAIL_SENT_SUCCESS: 'A reset password email has been sent to ',
  LOGGED_OUT_SUCCESS: 'Logged out Successfully',
  GET_APP_STATUS_SUCCESS: 'Getting App Status Successfully',
  SET_APP_STATUS_SUCCESS: 'Setting App Status Successfully',
  UNAUTHORIZED_ACTION: 'Unauthorized Action'
};

module.exports = {
  TYPES,
  MESSAGES,
};
