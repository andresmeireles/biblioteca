import { ApiUser } from "../../interfaces/ApiUser";
import { AuthState } from "./AuthState";

export enum AuthActionType {
    save,
    destroy,
    verifyEmail,
}

export type AuthActions =
    | {
          type: AuthActionType.save;
          payload: AuthState;
      }
    | {
          type: AuthActionType.verifyEmail;
          payload: ApiUser;
      }
    | {
          type: AuthActionType.destroy;
      };
