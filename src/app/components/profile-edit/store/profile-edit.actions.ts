import { Action } from '@ngrx/store';
import { EditProfile } from '../../../models/edit-profile/edit-profile.model';
import { ProfileEditState } from './profile-edit.reducer';

export const enum ProfileEditTypes {
    ProfileEdit_Set = '[ProfileEdit] Initial Set',
    ProfileEdit_Success = '[ProfileEdit] Success',
    ProfileEdit_Update = '[ProfileEdit] Update',
    ProfileEdit_Load = '[ProfileEdit] Load',
    ProfileEdit_Error = '[ProfileEdit] Error',
    ProfileEdit_Clear = '[ProfileEdit] Clear Store',
}

export class ProfileEditSet implements Action {
    readonly type = ProfileEditTypes.ProfileEdit_Set;

    constructor(public payload: EditProfile) {}
}
export class ProfileEditSuccess implements Action {
    readonly type = ProfileEditTypes.ProfileEdit_Success;

    constructor(public payload: EditProfile) {}
}
export class ProfileEditUpdate implements Action {
    readonly type = ProfileEditTypes.ProfileEdit_Update;
}
export class ProfileEditLoad implements Action {
    readonly type = ProfileEditTypes.ProfileEdit_Load;

    constructor(public payload: EditProfile) {}
}
export class ProfileEditClear implements Action {
  readonly type = ProfileEditTypes.ProfileEdit_Clear;
}
export class ProfileEditError implements Action {
    readonly type = ProfileEditTypes.ProfileEdit_Error;

    constructor(public payload: ProfileEditState) {}
}

export type ProfileEditActions =
    | ProfileEditSet
    | ProfileEditSuccess
    | ProfileEditUpdate
    | ProfileEditLoad
    | ProfileEditError
    | ProfileEditClear;
