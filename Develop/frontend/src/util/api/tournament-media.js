import {
  BACKEND_ADD_COMMENT,
  BACKEND_ADD_IMAGE,
  BACKEND_COMMENTS,
  BACKEND_IMAGES,
} from "../paths";
import { getWithParams, postDataBody } from "./fetch-requests";

export async function getTournamentImages(data) {
  return await getWithParams(BACKEND_IMAGES, data);
}

export async function getTournamentComments(data) {
  return await getWithParams(BACKEND_COMMENTS, data);
}

export async function postUploadComment(data) {
  return await postDataBody(BACKEND_ADD_COMMENT, data);
}

export async function postUploadImage(data) {
  return await postDataBody(BACKEND_ADD_IMAGE, data);
}
