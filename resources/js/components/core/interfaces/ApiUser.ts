export interface ApiUser {
    name: string;
    username: string;
    email: string;
}

export interface ApiAuthUser {
    user: ApiUser;
    token: string;
}

export interface UserVerified {
    verified: boolean;
    user: ApiUser;
}

export interface BlockUser {
    isBlocked: boolean;
    until: string | null;
}

export function nonBlockUser(): BlockUser {
    return {
        isBlocked: false,
        until: null,
    };
}
