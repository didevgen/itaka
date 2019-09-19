import { Action } from '@ngrx/store';

export const enum LikesCounterTypes {
    LIKE = '[LikesCounter] Likes Like ',
    DISLIKE = '[LikesCounter] Likes Dislike',
    // CLEARLIKE = '[LikesCounter] Like Clear',
    // CLEARDISLIKE = '[LikesCounter] Dislike Clear',
    GETPOSTID = '[LikesCounter] Get Post Id'
}

export class LikesLike implements Action {
    readonly type = LikesCounterTypes.LIKE;
}

export class LikeDislike implements Action {
    readonly type = LikesCounterTypes.DISLIKE;
}

export class GetPostId implements Action {
    readonly type = LikesCounterTypes.GETPOSTID;

    constructor(public payload: { postId: string}) {}
}

// export class LikeClearLike implements Action {
//     readonly type = LikesCounterTypes.CLEARLIKE;

//     // constructor(public payload: EditProfile) {}
// }

// export class LikeClearDislike implements Action {
//     readonly type = LikesCounterTypes.CLEARDISLIKE;

//     // constructor(public payload: EditProfile) {}
// }

export type LikesounterActions =
    | LikesLike
    | LikeDislike
    | GetPostId
    // | LikeClearLike
    // | LikeClearDislike
   