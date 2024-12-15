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

export const tempCorts = COURTS;

export const BACKEND_LOGGED = "/logged";
export const BACKEND_COURTS = "/courts";
export const BACKEND_ADD_COURT = BACKEND_COURTS + "/add";
export const BACKEND_COURT_OWNER = "/owner";

export const BACKEND_TOURNAMENTS = "/tournaments";
export const BACKEND_ADD_TOURNAMENT = BACKEND_TOURNAMENTS + "/add";

export function resolveBackendPath(path) {
  return BACKEND_URL + path;
}
