import { Action } from '@ngrx/store';
import { EditProfile } from '../../../models/edit-profile/edit-profile.model';

export const enum ProfileEditTypes {
    Set_Current = '[ProfileEdit] Set Current',
    ProfileEdit_Update = '[ProfileEdit] ProfileEdit Update',
    ProfileEdit_Delete = '[ProfileEdit] ProfileEdit Delete',
}

export class ProfileEditSet implements Action {
    readonly type = ProfileEditTypes.Set_Current;

    constructor(public payload: EditProfile) {}
}

export class Update implements Action {
    readonly type = ProfileEditTypes.ProfileEdit_Update;

    constructor(public payload: EditProfile) {}
}

export class Delete implements Action {
    readonly type = ProfileEditTypes.ProfileEdit_Delete;

    constructor(public payload: EditProfile) {}
}

export type ProfileEditActions = ProfileEditSet | Update | Delete;
