import { EditProfile } from '../../../models/edit-profile/edit-profile.model';
import * as ProfEdAct from './profile-edit.actions';

export interface ProfileEditState {
    ProfileEdit: EditProfile;
}

const initialState: ProfileEditState = {
    ProfileEdit: null,
};

export function profileEditReducer(
    state: ProfileEditState = initialState,
    action: ProfEdAct.ProfileEditActions,
): ProfileEditState {
    switch (action.type) {
        case ProfEdAct.ProfileEditTypes.ProfileEdit_Set:
            return {
                ProfileEdit: { ...action.payload },
            };
        case ProfEdAct.ProfileEditTypes.ProfileEdit_Update:
            return {
                ProfileEdit: { ...action.payload },
            };
        default:
            return state;
    }
}
