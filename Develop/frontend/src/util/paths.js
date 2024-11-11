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
export const COURT_DETAIL = COURTS + "/:courtId";
export const ADD_COURT = COURTS + "/add";
export const EDIT_COURT = COURT_DETAIL + "/edit";
export const COURT_NOT_FOUND = COURTS + NOT_FOUND;
export const OWNER_PROFILE = COURTS + "/profile";

export const tempCorts = COURTS;

export const BACKEND_LOGGED = "/logged";

export function resolveBackendPath(path) {
  return BACKEND_URL + path;
}
