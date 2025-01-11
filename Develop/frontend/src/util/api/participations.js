import {
  BACKEND_APPLICATION,
  BACKEND_APPLICATIONS,
  BACKEND_APPROVE_APPLICATION,
  BACKEND_DENY_APPLICATION,
  BACKEND_SIGNUP_FOR_TOURNAMENT,
  LOGIN,
  resolveBackendPath,
} from "../paths";
import { getWithParams, postDataBodyInline } from "./fetch-requests";

export async function getApplication(data) {
  const response = await fetch(
    resolveBackendPath(BACKEND_APPLICATION + "?" + data),
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (response.status === 401) {
    window.location.replace(LOGIN);
    return null;
  }

  const contentLength = response.headers.get("content-length");
  if (contentLength && parseInt(contentLength) == 0) {
    return null;
  } else {
    return await response.json();
  }
}

export async function postSignUpToTournament(data) {
  return await postDataBodyInline(BACKEND_SIGNUP_FOR_TOURNAMENT, data);
}

export async function getTournamentApplictions(data) {
  return await getWithParams(BACKEND_APPLICATIONS, data);
}

export async function postApproveParticipation(data) {
  return await postDataBodyInline(BACKEND_APPROVE_APPLICATION, data);
}

export async function postDenyParticipation(data) {
  return await postDataBodyInline(BACKEND_DENY_APPLICATION, data);
}
