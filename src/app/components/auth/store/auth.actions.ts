import { Action } from '@ngrx/store';

export const enum AuthTypes {
    LOGIN_START = '[Auth] Login Start',
    AUTHENTICATE_SUCCESS = '[Auth] Login',
    AUTHENTICATE_FAIL = '[Auth] Login Fail',
    SIGNUP_START = '[Auth] Signup Start',
    CLEAR_ERROR = '[Auth] Clear Error',
    AUTO_LOGIN = '[Auth] Auto Login',
    LOGOUT = '[Auth] Logout',
    LOGIN_WITH_GOOGLE = '[Auth] Login With Google',
}

export class AuthenticateSuccess implements Action {
    readonly type = AuthTypes.AUTHENTICATE_SUCCESS;

    constructor(
        public payload: {
            email: string;
            userId: string;
            token: string;
            expirationDate: Date;
            redirect: boolean;
        },
    ) {}
}

export class Logout implements Action {
    readonly type = AuthTypes.LOGOUT;
}

export class LoginWithGoogle implements Action {
    readonly type = AuthTypes.LOGIN_WITH_GOOGLE;
}

export class LoginStart implements Action {
    readonly type = AuthTypes.LOGIN_START;

    constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateFail implements Action {
    readonly type = AuthTypes.AUTHENTICATE_FAIL;

    constructor(public payload: string) {}
}

export class SignupStart implements Action {
    readonly type = AuthTypes.SIGNUP_START;

    constructor(public payload: { email: string; password: string }) {}
}

export class ClearError implements Action {
    readonly type = AuthTypes.CLEAR_ERROR;
}

export class AutoLogin implements Action {
    readonly type = AuthTypes.AUTO_LOGIN;
}

export type AuthActions =
    | AuthenticateSuccess
    | Logout
    | LoginStart
    | AuthenticateFail
    | SignupStart
    | ClearError
    | AutoLogin
    | LoginWithGoogle;
