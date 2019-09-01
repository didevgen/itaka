import { EditProfile } from '../../../models/edit-profile/edit-profile.model';
import * as ProfEdAct from './profile-edit.actions';

export interface ProfileEditState {
    name: string;
    surName: string;
    avatar: string | Blob;
}

const initialState: ProfileEditState = {
    name: null,
    surName: null,
    avatar: null,
};

export function profileEditReducer(
    state: ProfileEditState = initialState,
    action: ProfEdAct.ProfileEditActions,
): ProfileEditState {
    switch (action.type) {
        case ProfEdAct.ProfileEditTypes.ProfileEdit_Set:
            return {
                name: action.payload.name,
                surName: action.payload.surName,
                avatar: action.payload.avatar,
            };
        /*case ProfEdAct.ProfileEditTypes.ProfileEdit_Update:
            return {
                name: action.payload.name,
                surName: action.payload.surName,
                avatar: action.payload.avatar,
            };*/
        default:
            return state;
    }
}
