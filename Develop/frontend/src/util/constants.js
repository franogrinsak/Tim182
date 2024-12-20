import FeatureCard, {
  OWNER_COURTS,
  OWNER_TOURNAMENT,
  PLAYER_COURTS,
  PLAYER_TOURNAMENT,
  ADMINISTRATOR_USERS,
  getOwnerCourtsCard,
  getOwnerTournamentsCard,
  ADMINISTRATOR_MEMBERSHIP,
} from "../components/FeatureCard";

export const DEV_MODE = true;
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const USER_ROLES = {
  NONE: 0,
  NEW_USER: 1,
  PLAYER: 2,
  UNPAID_OWNER: 3,
  OWNER: 4,
  ADMIN: 5,
};

export const USER_ROLES_NAMES = {
  [USER_ROLES.NONE]: "None",
  [USER_ROLES.NEW_USER]: "New user",
  [USER_ROLES.PLAYER]: "Player",
  [USER_ROLES.UNPAID_OWNER]: "Unpaid owner",
  [USER_ROLES.OWNER]: "Owner",
  [USER_ROLES.ADMIN]: "Administrator",
};

export const FEATURE_CARDS_BY_ROLES = {
  [USER_ROLES.PLAYER]: [PLAYER_COURTS, PLAYER_TOURNAMENT],
  [USER_ROLES.OWNER]: [OWNER_COURTS, OWNER_TOURNAMENT],
  [USER_ROLES.ADMIN]: [ADMINISTRATOR_USERS, ADMINISTRATOR_MEMBERSHIP],
};

export function getFeatureCards(user) {
  if (!user) return [];

  switch (user.roleId) {
    case USER_ROLES.PLAYER:
      return [PLAYER_COURTS, PLAYER_TOURNAMENT];
    case USER_ROLES.OWNER:
      return [
        getOwnerCourtsCard(user.userId),
        getOwnerTournamentsCard(user.userId),
      ];
    case USER_ROLES.ADMIN:
      return [ADMINISTRATOR_USERS, ADMINISTRATOR_MEMBERSHIP];
    default:
      return [];
  }
}
