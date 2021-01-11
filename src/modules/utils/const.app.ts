export class ConstApp {
    //RESPONSES
    public static readonly USER_CREATED_OK = 'User created correctly';
    public static readonly LOG_OUT_OK = 'Successful log out';

    //MESSAGES
    public static readonly PASSWORD_MESSAGE = 'Password too weak';

    //DEFAULT RESPONSES MESSAGES
    public static readonly DEFAULT_GET_OK = 'The records has been successfully founded.';
    public static readonly DEFAULT_POST_OK = 'The record has been successfully created.';
    public static readonly DEFAULT_PUT_OK = 'The record has been successfully updated.';
    public static readonly DEFAULT_DELETE_OK = 'The record has been successfully deleted.';

    //ERROR MESSAGES
    public static readonly USERNAME_EXISTS_ERROR = 'Username already exists';
    public static readonly INVALID_CREDENTIALS_ERROR = 'Invalid credentials';
    public static readonly REFRESH_TOKEN_ERROR = "Error to create refresh token";
    public static readonly COULD_NOT_LOG_OUT_ERROR = "Couldn't log out";
    public static readonly COULD_NOT_EMPTY_THE_TOKEN = "Couldn't empty token";
}
