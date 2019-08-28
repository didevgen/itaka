import { EditProfile } from '../../../models/edit-profile/edit-profile.model';
import * as ProfEdAct from './profile-edit.actions';

export interface ProfileEditState {
    currentProfileEdit: EditProfile;
}

const initialState: ProfileEditState = {
    currentProfileEdit: null, // will be initialized by service from database
};

export function profileEditReducer(
    state: ProfileEditState = initialState,
    action: ProfEdAct.ProfileEditActions,
): ProfileEditState {
    switch (action.type) {
        case ProfEdAct.ProfileEditTypes.Set_Current:
            return {
                currentProfileEdit: { ...action.payload },
            };
        default:
            return state;
    }
}
