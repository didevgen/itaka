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
                ...state,
                name: action.payload.name,
                surname: action.payload.surname,
                avatar: action.payload.avatar,
            };
        case fromProfileEdit.ProfileEditTypes.ProfileEdit_Clear:
            return {
                name: null,
                surname: null,
                avatar: null,
                isError: false,
            };
        case fromProfileEdit.ProfileEditTypes.ProfileEdit_Error:
            return {
                ...state,
                isError: true,
            };
        default:
            return state;
    }
}
