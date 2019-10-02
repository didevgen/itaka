export interface Comment {
    text: string;
    date: string;
    userId: string;
    postId: string;
    commentId?: string;
    userProfile?: {
        name: string;
        avatar: string;
    };
}
