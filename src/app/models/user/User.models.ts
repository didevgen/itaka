import { EditProfile } from '../edit-profile/edit-profile.model';

export interface User extends EditProfile {
    name: string;
    surame: string;
    avatar: string;
    email: string;
    postID: string[];
}
