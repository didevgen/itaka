/**
 * EditProfile represents a data of the User editable  profile
 */
export interface EditProfile {
    name: string | undefined;
    surName: string | undefined;
    avatar: string | Blob;
}
