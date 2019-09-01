import { Action } from '@ngrx/store';
import { EditProfile } from '../../../models/edit-profile/edit-profile.model';

export const enum ProfileEditTypes {
    ProfileEdit_Set = '[ProfileEdit] Initial Set',
    ProfileEdit_SetSuccess = '[ProfileEdit] Set Success',
    ProfileEdit_SetError = '[ProfileEdit] Set Error',

    /*    ProfileEdit_Update = '[ProfileEdit] Update',
    ProfileEdit_UpdateSuccess = '[ProfileEdit] Update Success',
    ProfileEdit_UpdateError = '[ProfileEdit] Update Error',*/
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

/*export class Update implements Action {
    readonly type = ProfileEditTypes.ProfileEdit_Update;

    constructor(public payload: EditProfile) {}
}
export class UpdateSuccess implements Action {
    readonly type = ProfileEditTypes.ProfileEdit_UpdateSuccess;

    constructor(public payload: EditProfile) {}
}
export class UpdateError implements Action {
    readonly type = ProfileEditTypes.ProfileEdit_UpdateError;
}*/

export type ProfileEditActions =
    | ProfileEditSet
    | ProfileEditSetSuccess
    | ProfileEditSetError;
/* | Update
    | UpdateSuccess
    | UpdateError;*/
