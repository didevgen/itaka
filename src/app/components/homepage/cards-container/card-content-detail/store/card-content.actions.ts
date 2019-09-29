import { Action } from '@ngrx/store';

export const enum LikesCounterTypes {
    LIKE = '[LikesCounter] Likes Like ',
    DISLIKE = '[LikesCounter] Likes Dislike',
    SETPOSTID = '[LikesCounter] Set Post Id',
    POSTSUCCES = '[LikesCounter] Succes Post Id',
}

export class LikesLike implements Action {
    readonly type = LikesCounterTypes.LIKE;
}

export class LikeDislike implements Action {
    readonly type = LikesCounterTypes.DISLIKE;
}

export class SetPostId implements Action {
    readonly type = LikesCounterTypes.SETPOSTID;

    constructor(public payload: { postId: string }) {}
}
export class SuccesPostId implements Action {
    readonly type = LikesCounterTypes.POSTSUCCES;

    constructor(public payload: { postId: string; userId: string }) {}
}

export type LikesounterActions = LikesLike | LikeDislike | SetPostId;
