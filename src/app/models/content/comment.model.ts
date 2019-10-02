import { EditProfile } from '../edit-profile/edit-profile.model';

interface CommentState {
    send: boolean;
    cancel: boolean;
    delete: boolean;
}
interface CommentTime {
    wasAdded: string;
    wasChanged: string;
}
interface CommentContent extends EditProfile, CommentState, CommentTime {
    profile: EditProfile;
    state: CommentState;
    date: CommentTime;
    isAuthor: boolean;
    text: string;
}
export interface UserComment {
    comment: CommentContent;
}
