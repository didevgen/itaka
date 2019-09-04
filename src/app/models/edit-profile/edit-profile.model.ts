/**
 * EditProfile represents a data of the User editable  profile
 */
export interface EditProfile {
    name: string | null;
    surName: string | null;
    avatar: string | Blob | null;
    isError: boolean;
}
