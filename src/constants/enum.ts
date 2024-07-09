export enum RESPONSE_STATES {
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum RESPONSE_CODES {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export enum ROLES {
  INFLUENCER = 'Influencer',
  BRAND = 'Brand',
  AGENCY = 'Agency',
  ADMIN = 'Admin',
  EMPLOYEE = 'Employee',
  ACCOUNTS = 'Accounts',
}

export enum PersonType {
  INFLUENCER = 'Influencer',
  BRAND = 'Brand',
}
