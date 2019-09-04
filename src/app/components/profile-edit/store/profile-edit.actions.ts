import { Action } from '@ngrx/store';
import { EditProfile } from '../../../models/edit-profile/edit-profile.model';

export const enum ProfileEditTypes {
    ProfileEdit_Set = '[ProfileEdit] Initial Set',
    ProfileEdit_SetSuccess = '[ProfileEdit] Set Success',
    ProfileEdit_SetError = '[ProfileEdit] Set Error',
}

export class ProfileEditSet implements Action {
    readonly type = ProfileEditTypes.ProfileEdit_Set;

    constructor(public payload: EditProfile) {}
}
export class ProfileEditSetSuccess implements Action {
    readonly type = ProfileEditTypes.ProfileEdit_SetSuccess;

    constructor(public payload: EditProfile) {}
}
export class ProfileEditSetError implements Action {
    readonly type = ProfileEditTypes.ProfileEdit_SetError;
}

export type ProfileEditActions =
    | ProfileEditSet
    | ProfileEditSetSuccess
    | ProfileEditSetError;
