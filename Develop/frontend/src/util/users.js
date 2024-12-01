import { USER_ROLES } from "./constants";

export function isOwner(user) {
  return user?.roleId == USER_ROLES.OWNER;
}

export function isPlayer(user) {
  return user?.roleId == USER_ROLES.PLAYER;
}
