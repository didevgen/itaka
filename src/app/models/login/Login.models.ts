export interface Login {
    email: string;
    password: string;
}

export interface UserSignup {
    firstName: string;
    lastName: string;
    email: string;
    nickName?: string;
    avatarUrl: string;
}
