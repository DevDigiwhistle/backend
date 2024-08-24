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
  INFLUENCER = 4,
  BRAND = 3,
  AGENCY = 5,
  ADMIN = 1,
  EMPLOYEE = 2,
  ACCOUNTS = 6,
}

export enum PersonType {
  INFLUENCER = 'Influencer',
  BRAND = 'Brand',
}

export enum HideFrom {
  BRAND = 'brand',
  AGENCY = 'agency',
}

export enum CampaignStatus {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
}

export enum CampaignParticipantStatus {
  LIVE = 'Live',
  NOT_LIVE = 'Not Live',
}
