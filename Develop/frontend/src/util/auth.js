import { redirect } from "react-router-dom";
import { BACKEND_LOGGED, resolveBackendPath } from "./paths";

export async function requireAuth() {
  let data;
  try {
    data = await fetch(resolveBackendPath(BACKEND_LOGGED), {
      credentials: "include",
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return redirect("/login");
  }
  return await data.json();
}
