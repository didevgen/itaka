import * as fromProfileEdit from './profile-edit.actions';
import { EditProfile } from '../../../models/edit-profile/edit-profile.model';

export interface ProfileEditState extends EditProfile {
    isError?: boolean;
}

const initialState: ProfileEditState = {
    name: null,
    surname: null,
    avatar: null,
    isError: false,
};

export function profileEditReducer(
    state: ProfileEditState = initialState,
    action: fromProfileEdit.ProfileEditActions,
): ProfileEditState {
    switch (action.type) {
        case fromProfileEdit.ProfileEditTypes.ProfileEdit_Set:
        case fromProfileEdit.ProfileEditTypes.ProfileEdit_Success:
            return {
                name: action.payload.name,
                surname: action.payload.surname,
                avatar: action.payload.avatar,
            };
        case fromProfileEdit.ProfileEditTypes.ProfileEdit_Update:
            return;
        case fromProfileEdit.ProfileEditTypes.ProfileEdit_Load:
            return {
                name: action.payload.name,
                surname: action.payload.surname,
                avatar: action.payload.avatar,
            };
        case fromProfileEdit.ProfileEditTypes.ProfileEdit_Error:
            return {
                ...state,
            };
        default:
            return state;
    }
}
