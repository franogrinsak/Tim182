import {
  BACKEND_ADD_COURT,
  BACKEND_ALL_COURTS,
  BACKEND_COURT_DETAILS,
  BACKEND_COURT_OWNER,
  BACKEND_COURTS,
  BACKEND_COURTS_IMAGELESS,
  BACKEND_EDIT_COURT,
  BACKEND_EDIT_OWNER,
} from "../paths";
import { get, getWithParams, postDataBody } from "./fetch-requests";

export async function postNewCourt(data) {
  await postDataBody(BACKEND_ADD_COURT, data);
}

export async function postUpdateCourt(data) {
  await postDataBody(BACKEND_EDIT_COURT, data);
}

export async function getOwnerProfileData(data) {
  return await getWithParams(BACKEND_COURT_OWNER, data);
}

export async function postUpdateOwnerProfileData(data) {
  await postDataBody(BACKEND_EDIT_OWNER, data);
}

export async function getAllCourts() {
  return await get(BACKEND_ALL_COURTS);
}

export async function getCourtsForOwners(data) {
  return await getWithParams(BACKEND_COURTS, data);
}

export async function getCourtsForOwnersImageless(data) {
  return await getWithParams(BACKEND_COURTS_IMAGELESS, data);
}

export async function getCourtDetails(data) {
  return await getWithParams(BACKEND_COURT_DETAILS, data);
}
