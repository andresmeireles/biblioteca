export interface ApiUser {
    name: string;
    username: string;
    email: string;
}

export interface ApiAuthUser {
    user: ApiUser;
    token: string;
}
