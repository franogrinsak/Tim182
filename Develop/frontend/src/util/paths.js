import { BACKEND_URL } from "./constants";

export const HOME = "/";
export const LOGIN = "/login";
export const OAUTH_PATH = "/oauth2/authorization/google";
export const DASHBOARD = "/dashboard";
export const REGISTER = "/dashboard/register";
export const LOGGED = "dashboard/logged";

export function resolveBackendPath(path) {
  return BACKEND_URL + path;
}
