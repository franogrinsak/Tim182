import { BACKEND_LOGGED } from "../paths";
import { postDataBody } from "./fetch-requests";

export async function postRegisterData(data) {
  await postDataBody(BACKEND_LOGGED, data);
}
