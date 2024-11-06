import { requireAuth } from "./auth";
import { resolveBackendPath } from "./paths";

export async function postRegisterData(data) {
  //requireAuth();
  const response = await fetch(resolveBackendPath("/logged"), {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (!response.ok) {
    throw { status: response.status, message: response.statusText };
  }
  //const result = await response.json();
  return data;
}
