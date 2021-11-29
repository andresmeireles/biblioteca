import { BlockUser } from "../../interfaces/ApiUser";
import { getWithToken, getWithTokenWithType } from "../request";

export async function userIsBlocked(): Promise<BlockUser> {
    return getWithTokenWithType<BlockUser>("/api/user/blocked");
}
