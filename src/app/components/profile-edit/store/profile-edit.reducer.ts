import * as ProfEdAct from './profile-edit.actions';
import { EditProfile } from '../../../models/edit-profile/edit-profile.model';

export interface ProfileEditState extends EditProfile {
    name: string | null;
    surname: string | null;
    avatar: string | Blob | null;
    isError?: boolean;
}

const initialState: ProfileEditState = {
    name: null,
    surname: null,
    avatar: null,
};

export function profileEditReducer(
    state: ProfileEditState = initialState,
    action: ProfEdAct.ProfileEditActions,
): ProfileEditState {
    switch (action.type) {
        case ProfEdAct.ProfileEditTypes.ProfileEdit_Set:
            return {
                ...state,
                name: action.payload.name,
                surname: action.payload.surname,
                avatar: action.payload.avatar,
            };
        case ProfEdAct.ProfileEditTypes.ProfileEdit_SetSuccess:
            return {
                ...state,
                name: action.payload.name,
                surname: action.payload.surname,
                avatar: action.payload.avatar,
            };
        case ProfEdAct.ProfileEditTypes.ProfileEdit_SetError:
            return {
                ...state,
            };
        default:
            return state;
    }
}
