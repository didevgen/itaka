import * as ProfEdAct from './profile-edit.actions';

export interface ProfileEditState {
    name: string;
    surName: string;
    avatar: string | Blob;
    isError: boolean;
}

const initialState: ProfileEditState = {
    name: null,
    surName: null,
    avatar: null,
    isError: false,
};

export function profileEditReducer(
    state: ProfileEditState = initialState,
    action: ProfEdAct.ProfileEditActions,
): ProfileEditState {
    switch (action.type) {
        case ProfEdAct.ProfileEditTypes.ProfileEdit_Set:
            return {
                ...state,
                name: action.payload.name,
                surName: action.payload.surName,
                avatar: action.payload.avatar,
            };
        case ProfEdAct.ProfileEditTypes.ProfileEdit_SetSuccess:
            return {
                ...state,
                name: action.payload.name,
                surName: action.payload.surName,
                avatar: action.payload.avatar,
            };
        case ProfEdAct.ProfileEditTypes.ProfileEdit_SetError:
            return {
                ...state,
                isError: true,
            };
        default:
            return state;
    }
}
