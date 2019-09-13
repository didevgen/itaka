import { User } from '../user.model';
import { AuthTypes, AuthActions } from './auth.actions';

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false,
};

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case AuthTypes.AUTHENTICATE_SUCCESS:
            const user = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate,
            );
            return {
                ...state,
                authError: null,
                user,
                loading: false,
            };
        case AuthTypes.LOGOUT:
            return {
                ...state,
                user: null,
            };
        case AuthTypes.LOGIN_START:
        case AuthTypes.SIGNUP_START:
            return {
                ...state,
                authError: null,
                loading: true,
            };
        case AuthTypes.AUTHENTICATE_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false,
            };
        case AuthTypes.CLEAR_ERROR:
            return {
                ...state,
                authError: null,
            };
        default:
            return state;
    }
}

export const getUser = (state: State) => state.user;
