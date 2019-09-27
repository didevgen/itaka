import { Action } from '@ngrx/store';

export const enum LikesCounterTypes {
    LIKE = '[LikesCounter] Likes Like ',
    DISLIKE = '[LikesCounter] Likes Dislike',
    GETPOSTID = '[LikesCounter] Get Post Id',
}

export class LikesLike implements Action {
    readonly type = LikesCounterTypes.LIKE;
}

export class LikeDislike implements Action {
    readonly type = LikesCounterTypes.DISLIKE;
}

export class GetPostId implements Action {
    readonly type = LikesCounterTypes.GETPOSTID;

    constructor(public payload: { postId: string }) {}
}

export type LikesounterActions = LikesLike | LikeDislike | GetPostId;
