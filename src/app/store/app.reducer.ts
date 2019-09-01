import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../components/auth/store/auth.reducer';
import * as profEdit from '../components/profile-edit/store/profile-edit.reducer';

export interface AppState {
    auth: fromAuth.State;
    editProfile: profEdit.ProfileEditState;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  editProfile: profEdit.profileEditReducer,
};
