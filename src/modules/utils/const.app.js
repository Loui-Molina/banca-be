"use strict";
exports.__esModule = true;
exports.ConstApp = void 0;
var ConstApp = /** @class */ (function () {
    function ConstApp() {
    }
    /***
     * DB constants
     * */
    ConstApp.USER = 'user';
    ConstApp.BANKING = 'banking';
    ConstApp.SUSBCRIPTIONS = 'subscriptions';
    /***
     * RESPONSES
     * */
    ConstApp.USER_CREATED_OK = 'User created correctly';
    ConstApp.LOG_OUT_OK = 'Successful log out';
    ConstApp.PASSWORD_CHANGED = 'PASSWORD_CHANGED';
    ConstApp.USER_UPDATED = 'User updated';
    /***
     * MESSAGES
     * */
    ConstApp.PASSWORD_MESSAGE = 'Password too weak';
    /***
     * DEFAULT RESPONSES MESSAGES
     * */
    ConstApp.DEFAULT_GET_OK = 'The records has been successfully founded.';
    ConstApp.DEFAULT_POST_OK = 'The record has been successfully created.';
    ConstApp.DEFAULT_PUT_OK = 'The record has been successfully updated.';
    ConstApp.DEFAULT_DELETE_OK = 'The record has been successfully deleted.';
    /***
     * ERROR MESSAGES
     * */
    ConstApp.USERNAME_EXISTS_ERROR = 'Username already exists';
    ConstApp.INVALID_CREDENTIALS_ERROR = 'Invalid credentials';
    ConstApp.CANNOT_LOGIN = 'Cannot login';
    ConstApp.CANNOT_CANCEL_TICKET = 'Cannot cancel ticket';
    ConstApp.CANNOT_CLAIM_TICKET = 'Cannot claim ticket';
    ConstApp.REFRESH_TOKEN_ERROR = 'Error to create refresh token';
    ConstApp.COULD_NOT_LOG_OUT_ERROR = "Couldn't log out";
    ConstApp.COULD_NOT_EMPTY_TOKEN = "Couldn't empty token";
    ConstApp.COULD_NOT_CHANGE_PASSWORD = 'PASSWORD NOT CHANGED';
    ConstApp.PASSWORD_NOT_MATCH = 'PASSWORD NOT MATCH';
    ConstApp.ESTABLISHMENT_NOT_FOUND = 'ESTABLISHMENT NOT FOUND';
    ConstApp.DESTINATION_ORIGIN_NOT_FOUND = 'DESTINATION || ORIGIN NOT FOUND';
    ConstApp.PASSWORD_SHOULD_NOT_BE_THE_SAME_ERROR = "New password can't be the same as old one";
    ConstApp.PASSWORD_SHOULD_NOT_BE_OLD = 'New password was used before';
    ConstApp.USER_NOT_FOUND = 'USER_NOT_FOUND';
    ConstApp.CANNOT_CHANGE_PASSWORD_OF_THE_SAME_ROLE = 'CANT CHANGE PASSWORD OF THE SAME OR ABOVE ROLE';
    ConstApp.UNAUTHORIZE_TO_CHANGE_PASSWORD = 'UNAUTHORIZE TO CHANGE PASSWORD';
    ConstApp.UNABLE_TO_CHANGE_PASSWORD = 'UNABLE TO CHANGE PASSWORD';
    ConstApp.UNABLE_TO_UPDATE_USER = 'UNABLE TO UPDATE USER';
    ConstApp.UNAUTHORIZE_TO_UPDATE_USER = 'UNAUTHORIZE TO UPDATE USER';
    ConstApp.NOT_LOGGED = 'NOT LOGGED';
    ConstApp.UNAUTHORIZED = 'UNAUTHORIZED';
    /***
     * EXCEPTIONS MESSAGES
     * */
    ConstApp.SOMETHING_WRONG_EXCEPTION = 'Something went Wrong';
    return ConstApp;
}());
exports.ConstApp = ConstApp;
