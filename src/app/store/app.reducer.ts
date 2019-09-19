import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store';

import * as fromAuth from '../components/auth/store/auth.reducer';
import * as profEdit from '../components/profile-edit/store/profile-edit.reducer';
import * as fromLikes from '../components/homepage/cards-container/card-content-detail/store/card-content.reducer';

export interface AppState {
    auth: fromAuth.State;
    editProfile: profEdit.ProfileEditState;
    likesCount : fromLikes.State
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    editProfile: profEdit.profileEditReducer,
    likesCount : fromLikes.LikesCountReducer
};

export const getAuth = createFeatureSelector<fromAuth.State>('auth');
export const getUser = createSelector(
    getAuth,
    fromAuth.getUser,
);
