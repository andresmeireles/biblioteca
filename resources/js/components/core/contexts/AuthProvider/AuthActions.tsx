export enum AuthActionType {
    login,
    logout,
}

export interface Login {
    login: string;
    password: string;
}

export type AuthActions =
    | {
          type: AuthActionType.login;
          payload: Login;
      }
    | {
          type: AuthActionType.logout;
      };
