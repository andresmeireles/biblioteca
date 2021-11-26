import { AuthState } from "./AuthState";

export enum AuthActionType {
    save,
    destroy,
}

export type AuthActions =
    | {
          type: AuthActionType.save;
          payload: AuthState;
      }
    | {
          type: AuthActionType.destroy;
      };
