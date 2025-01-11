import {
  BACKEND_DELETE_NOTIFICATIONS,
  BACKEND_GET_NOTIFICATIONS,
  BACKEND_MARK_NOTIFICATIONS,
  BACKEND_SUBSCRIBE_TO_NOTIFICATIONS,
  BACKEND_SUBSCRIBED_TO_NOTIFICATIONS,
  BACKEND_UNREAD_NOTIFICATIONS,
} from "../paths";
import {
  getWithParams,
  getWithParamsInlineWithRedirectData,
  postDataBodyInline,
  postDataParamsInline,
} from "./fetch-requests";

export async function getNotifications(data) {
  return await getWithParams(BACKEND_GET_NOTIFICATIONS, data);
}

export async function postMarkNotifications(data) {
  return await postDataBodyInline(BACKEND_MARK_NOTIFICATIONS, data);
}

export async function postDeleteNotifications(data) {
  return await postDataBodyInline(BACKEND_DELETE_NOTIFICATIONS, data);
}

export async function getUnreadNotifications(data) {
  return await getWithParamsInlineWithRedirectData(
    BACKEND_UNREAD_NOTIFICATIONS,
    data
  );
}

export async function getIsSubscribedToTournaments(data) {
  return await getWithParamsInlineWithRedirectData(
    BACKEND_SUBSCRIBED_TO_NOTIFICATIONS,
    data
  );
}

export async function postSetIsSubscribedToTournaments(data) {
  return await postDataParamsInline(BACKEND_SUBSCRIBE_TO_NOTIFICATIONS, data);
}
