import { Action } from '@ngrx/store';
import { EditProfile } from '../../../models/edit-profile/edit-profile.model';

export const enum ProfileEditTypes {
    ProfileEdit_Set = '[ProfileEdit] First Set',
    ProfileEdit_Update = '[ProfileEdit] Update',
}

export class ProfileEditSet implements Action {
    readonly type = ProfileEditTypes.ProfileEdit_Set;

    constructor(public payload: EditProfile) {}
}

export class Update implements Action {
    readonly type = ProfileEditTypes.ProfileEdit_Update;

    constructor(public payload: EditProfile) {}
}

export type ProfileEditActions = ProfileEditSet | Update;
