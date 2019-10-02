import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store';

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

export const getAuth = createFeatureSelector<fromAuth.State>('auth');
export const getUser = createSelector(
    getAuth,
    fromAuth.getUser,
);
