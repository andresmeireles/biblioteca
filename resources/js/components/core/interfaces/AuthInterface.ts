export interface Register {
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface HasPermission {
    hasPermissionn: boolean;
}
