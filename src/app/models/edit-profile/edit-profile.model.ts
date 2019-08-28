/**
 * EditProfile represents a data of the User editable  profile
 */
export interface EditProfile {
    email: string;
    password: string;
    bio?: string;
    skills: string[];
    avatar?: string;
}
