import { BACKEND_URL } from "./constants";

export const HOME = "/";
export const NOT_FOUND = "/not-found";
export const LOGIN = "/login";
export const LOGOUT = "/logout";
export const OAUTH_PATH = "/oauth2/authorization/google";
export const APP = "/app";

export const DASHBOARD = APP + "/";
export const REGISTER = APP + "/register";
export const LOGGED = APP + "/logged";

export const COURTS = APP + "/courts";
export const OWNER_COURTS = COURTS + "/:ownerId";
export const COURT_DETAIL = OWNER_COURTS + "/:courtId";
export const COURT_OWNER_DETAIL = OWNER_COURTS + "/:courtId";
export const COURT_OWNER_ADD = OWNER_COURTS + "/add";
export const ADD_COURT = COURTS + "/add";
export const EDIT_COURT = COURT_OWNER_DETAIL + "/edit/court";
export const COURT_NOT_FOUND = COURTS + NOT_FOUND;
export const OWNER_PROFILE = COURTS + "/profile";
export const COURT_OWNER_PROFILE = OWNER_COURTS + "/profile";
export const EDIT_COURT_OWNER_PROFILE = COURT_OWNER_PROFILE + "/edit";

export const TOURNAMENTS = APP + "/tournaments";
export const OWNER_TOURNAMENTS = TOURNAMENTS + "/:ownerId";
export const ORGANIZE_TOURNAMENT = OWNER_TOURNAMENTS + "/organize";
export const TOURNAMENT_DETAIL = OWNER_TOURNAMENTS + "/:tournamentId";
export const TOURNAMENT_PARTICIPATIONS = TOURNAMENT_DETAIL + "/applications";
export const TOURNAMENT_MEDIA = TOURNAMENT_DETAIL + "/media";

export const USERS = APP + "/users";
export const EDIT_USER = USERS + "/edit/:userId";
export const ADD_USER = USERS + "/add";

export const NOTIFICATIONS = APP + "/notifications";
export const PLAYER_NOTIFICATIONS = NOTIFICATIONS + "/:playerId";

export const MEMBERSHIP = APP + "/membership";
export const PURCHASE_MEMBERSHIP = MEMBERSHIP + "/purchase";

export const tempCorts = COURTS;

export const BACKEND_LOGGED = "/logged";

export const BACKEND_COURTS = "/courts";
export const BACKEND_COURTS_IMAGELESS = BACKEND_COURTS + "/imageless";
export const BACKEND_ALL_COURTS = BACKEND_COURTS + "/all";
export const BACKEND_COURT_DETAILS = BACKEND_COURTS + "/court";
export const BACKEND_ADD_COURT = BACKEND_COURTS + "/add";
export const BACKEND_EDIT_COURT = BACKEND_COURTS + "/edit";

export const BACKEND_COURT_OWNER = "/owner";
export const BACKEND_EDIT_OWNER = BACKEND_COURT_OWNER + "/edit";

export const BACKEND_TOURNAMENTS = "/tournaments";
export const BACKEND_TOURNAMENT_DETAILS = BACKEND_TOURNAMENTS + "/get";
export const BACKEND_OWNERS_TOURNAMENTS = BACKEND_TOURNAMENTS + "/owners";
export const BACKEND_ALL_TOURNAMENTS = BACKEND_TOURNAMENTS + "/all";
export const BACKEND_ADD_TOURNAMENT = BACKEND_TOURNAMENTS + "/add";
export const BACKEND_FINISH_TOURNAMENT = BACKEND_TOURNAMENTS + "/finish";
export const BACKEND_IMAGES = BACKEND_TOURNAMENTS + "/images";
export const BACKEND_ADD_IMAGE = BACKEND_IMAGES + "/add";
export const BACKEND_COMMENTS = BACKEND_TOURNAMENTS + "/comments";
export const BACKEND_ADD_COMMENT = BACKEND_COMMENTS + "/add";
export const BACKEND_APPLICATION = BACKEND_TOURNAMENTS + "/application";
export const BACKEND_APPLICATIONS = BACKEND_TOURNAMENTS + "/applications";
export const BACKEND_SIGNUP_FOR_TOURNAMENT = BACKEND_TOURNAMENTS + "/signup";
export const BACKEND_PLAYER_APPLICATIONS = BACKEND_APPLICATIONS + "/players";
export const BACKEND_DENY_APPLICATION = BACKEND_TOURNAMENTS + "/deny";
export const BACKEND_APPROVE_APPLICATION = BACKEND_TOURNAMENTS + "/approve";

export const BACKEND_SLOTS = "/slots";
export const BACKEND_SLOTS_OWNERS = BACKEND_SLOTS + "/get/owners";
export const BACKEND_SLOTS_PLAYERS = BACKEND_SLOTS + "/get/players";
export const BACKEND_ADD_SLOT = BACKEND_SLOTS + "/add";
export const BACKEND_REMOVE_SLOT = BACKEND_SLOTS + "/delete";
export const BACKEND_BOOK_SLOT = BACKEND_SLOTS + "/book";
export const BACKEND_BUY_BOOKING_SLOT = "/checkout";
export const BACKEND_CANCEL_SLOT = BACKEND_SLOTS + "/cancel";

export const BACKEND_NOTIFICATIONS = "/notifications";
export const BACKEND_GET_NOTIFICATIONS = BACKEND_NOTIFICATIONS + "/get";
export const BACKEND_MARK_NOTIFICATIONS = BACKEND_NOTIFICATIONS + "/mark";
export const BACKEND_DELETE_NOTIFICATIONS = BACKEND_NOTIFICATIONS + "/delete";
export const BACKEND_UNREAD_NOTIFICATIONS = BACKEND_NOTIFICATIONS + "/unread";
export const BACKEND_SUBSCRIBE_TO_NOTIFICATIONS =
  BACKEND_NOTIFICATIONS + "/subscribe";
export const BACKEND_SUBSCRIBED_TO_NOTIFICATIONS =
  BACKEND_NOTIFICATIONS + "/subscribed";

export const BACKEND_MEMBERSHIP = "/membership";
export const BACKEND_GET_MEMBERSHIP = BACKEND_MEMBERSHIP + "/get";
export const BACKEND_SET_MEMBERSHIP = BACKEND_MEMBERSHIP + "/set";

export const BACKEND_USERS = "/users";
export const BACKEND_GET_USER = BACKEND_USERS + "/get";
export const BACKEND_ALL_USERS = BACKEND_USERS + "/all";
export const BACKEND_ADD_USER = BACKEND_USERS + "/add";
export const BACKEND_DELETE_USER = BACKEND_USERS + "/delete";
export const BACKEND_EDIT_USER = BACKEND_USERS + "/edit";

export function resolveBackendPath(path) {
  return BACKEND_URL + path;
}
