import {
  BACKEND_ADD_SLOT,
  BACKEND_BOOK_SLOT,
  BACKEND_BUY_BOOKING_SLOT,
  BACKEND_CANCEL_SLOT,
  BACKEND_REMOVE_SLOT,
  BACKEND_SLOTS_OWNERS,
  BACKEND_SLOTS_PLAYERS,
  LOGIN,
  resolveBackendPath,
} from "../paths";
import {
  getWithParamsInline,
  postDataBodyInline,
  postDataParamsInline,
} from "./fetch-requests";

async function redirectPostBody(path, data) {
  return await postDataBodyInline(path, data);
}

async function redirectPostParams(path, data) {
  return await postDataParamsInline(path, data);
}

export async function postNewTimeSlot(data) {
  return await redirectPostBody(BACKEND_ADD_SLOT, data);
}

export async function getTimeSlotsOwners(data) {
  return await getWithParamsInline(BACKEND_SLOTS_OWNERS, data);
}

export async function getTimeSlotsPlayers(data) {
  return await getWithParamsInline(BACKEND_SLOTS_PLAYERS, data);
}

export async function postDeleteTimeSlot(data) {
  return await redirectPostParams(BACKEND_REMOVE_SLOT, data);
}

export async function postBookTimeSlot(data) {
  return await redirectPostParams(BACKEND_BOOK_SLOT, data);
}

export async function postBookTimeSlotBuy(data) {
  let response;
  try {
    response = await fetch(resolveBackendPath(BACKEND_BUY_BOOKING_SLOT), {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Network Error:", error);
  }

  if (response.status === 401) {
    window.location.replace(LOGIN);
    return false;
  }

  const stripe = await response.json();

  window.location.replace(stripe.sessionUrl);

  return false;
}

export async function postCancelTimeSlot(data) {
  return await redirectPostParams(BACKEND_CANCEL_SLOT, data);
}
