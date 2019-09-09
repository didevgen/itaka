import { EditProfile } from '../edit-profile/edit-profile.model';

export interface User extends EditProfile {
    email: string;
    postID: string[];
}
