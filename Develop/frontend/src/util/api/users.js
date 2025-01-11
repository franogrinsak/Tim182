import {
  BACKEND_ADD_USER,
  BACKEND_ALL_USERS,
  BACKEND_DELETE_USER,
  BACKEND_EDIT_USER,
  BACKEND_GET_USER,
} from "../paths";
import {
  get,
  getWithParams,
  postDataBody,
  postDataParams,
} from "./fetch-requests";

export async function getAllUsers() {
  return await get(BACKEND_ALL_USERS);
}

export async function getUser(data) {
  return await getWithParams(BACKEND_GET_USER, data);
}

export async function postAddUser(data) {
  await postDataBody(BACKEND_ADD_USER, data);
}

export async function postDeleteUser(data) {
  await postDataParams(BACKEND_DELETE_USER, data);
}

export async function postUpdateUserData(data) {
  await postDataBody(BACKEND_EDIT_USER, data);
}
