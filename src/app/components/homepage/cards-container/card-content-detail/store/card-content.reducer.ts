import { LikesCounterTypes, LikesounterActions } from './card-content.actions';

export interface State {
    likes: boolean;
    dislikes: boolean;
    postId: string;
}

const initialState: State = {
    likes: false,
    dislikes: false,
    postId: null,
};

export function LikesCountReducer(
    state = initialState,
    action: LikesounterActions,
) {
    switch (action.type) {
        case LikesCounterTypes.LIKE:
            return {
                ...state,
                likes: !state.likes,
                dislikes: false,
            };
        case LikesCounterTypes.DISLIKE:
            return {
                ...state,
                dislikes: !state.dislikes,
                likes: false,
            };
        case LikesCounterTypes.GETPOSTID:
            return {
                ...state,
                postId: action.payload.postId,
            };
        // case LikesCounterTypes.CLEARLIKE:
        //         return {
        //             ...state,
        //             likes : false,
        //         };
        // case LikesCounterTypes.CLEARLIKE:
        //         return {
        //             ...state,
        //             dislikes : false,
        //             };
        default:
            return state;
    }
}
