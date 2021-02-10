export class ConstApp {
    /***
     * DB constants
     * */
    public static readonly USER = 'user';
    public static readonly BANKING = 'banking';
    public static readonly SUSBCRIPTIONS = 'subscriptions';

    /***
     * RESPONSES
     * */
    public static readonly USER_CREATED_OK = 'User created correctly';
    public static readonly LOG_OUT_OK = 'Successful log out';
    public static readonly PASSWORD_CHANGED = 'PASSWORD_CHANGED';

    /***
     * MESSAGES
     * */
    public static readonly PASSWORD_MESSAGE = 'Password too weak';

    /***
     * DEFAULT RESPONSES MESSAGES
     * */
    public static readonly DEFAULT_GET_OK = 'The records has been successfully founded.';
    public static readonly DEFAULT_POST_OK = 'The record has been successfully created.';
    public static readonly DEFAULT_PUT_OK = 'The record has been successfully updated.';
    public static readonly DEFAULT_DELETE_OK = 'The record has been successfully deleted.';

    /***
     * ERROR MESSAGES
     * */
    public static readonly USERNAME_EXISTS_ERROR = 'Username already exists';
    public static readonly INVALID_CREDENTIALS_ERROR = 'Invalid credentials';
    public static readonly CANNOT_LOGIN = 'Cannot login';
    public static readonly CANNOT_CANCEL_TICKET = 'Cannot cancel ticket';
    public static readonly CANNOT_CLAIM_TICKET = 'Cannot claim ticket';
    public static readonly REFRESH_TOKEN_ERROR = 'Error to create refresh token';
    public static readonly COULD_NOT_LOG_OUT_ERROR = "Couldn't log out";
    public static readonly COULD_NOT_EMPTY_TOKEN = "Couldn't empty token";
    public static readonly COULD_NOT_CHANGE_PASSWORD = 'PASSWORD NOT CHANGED';
    public static readonly PASSWORD_NOT_MATCH = 'PASSWORD NOT MATCH';
    public static readonly ESTABLISHMENT_NOT_FOUND = 'ESTABLISHMENT NOT FOUND';
    public static readonly DESTINATION_ORIGIN_NOT_FOUND = 'DESTINATION || ORIGIN NOT FOUND';
    public static readonly PASSWORD_SHOULD_NOT_BE_THE_SAME_ERROR = "New password can't be the same as old one";
    public static readonly PASSWORD_SHOULD_NOT_BE_OLD = 'New password was used before';
    public static readonly USER_NOT_FOUND = 'USER_NOT_FOUND';
    public static readonly CANNOT_CHANGE_PASSWORD_OF_THE_SAME_ROLE = 'CANT CHANGE PASSWORD OF THE SAME OR ABOVE ROLE';
    public static readonly UNAUTHORIZE_TO_CHANGE_PASSWORD = 'UNAUTHORIZE TO CHANGE PASSWORD';
    public static readonly UNABLE_TO_CHANGE_PASSWORD = 'UNABLE TO CHANGE PASSWORD';
    public static readonly NOT_LOGGED = 'NOT LOGGED';
    public static readonly UNAUTHORIZED = 'UNAUTHORIZED';

    /***
     * EXCEPTIONS MESSAGES
     * */
    public static readonly SOMETHING_WRONG_EXCEPTION = 'Something went Wrong';
}
