import {
  BACKEND_GET_MEMBERSHIP,
  BACKEND_SET_MEMBERSHIP,
  resolveBackendPath,
} from "../paths";
import { get, postDataParams } from "./fetch-requests";

export async function getMembershipPrice() {
  return await get(BACKEND_GET_MEMBERSHIP);
}

export async function postSetMembershipPrice(data) {
  await postDataParams(BACKEND_SET_MEMBERSHIP, data);
}

export async function postPurchaseMembership(data) {
  try {
    const response = await fetch(resolveBackendPath("/checkout"), {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      window.location.replace(LOGIN);
      return false;
    }

    const stripe = await response.json();
    window.location.replace(stripe.sessionUrl);
    return false;
  } catch (error) {
    console.error("Network Error:", error);
  }
}
