import { BACKEND_URL } from "./constants";

export const HOME = "/";
export const LOGIN = "/login";
export const LOGOUT = "/logout";
export const OAUTH_PATH = "/oauth2/authorization/google";
export const APP = "/app";
export const DASHBOARD = APP + "/";
export const REGISTER = APP + "/register";
export const LOGGED = APP + "/logged";

export const BACKEND_LOGGED = "/logged";

export function resolveBackendPath(path) {
  return BACKEND_URL + path;
}
