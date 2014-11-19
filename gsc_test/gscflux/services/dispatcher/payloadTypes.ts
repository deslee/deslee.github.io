/* inject:ts */ /// <reference path="../../references.ts" />
/* endinject */
module GSC.Services.EventDispatcher {
  export enum PayloadType {
    UPDATE_SURVEY,
    INITIALIZE_MOCK_SURVEY,
    REGISTER_USER,
    LOGIN_USER,
    LOGOUT_USER
  }
}
