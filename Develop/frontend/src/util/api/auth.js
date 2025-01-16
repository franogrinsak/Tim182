import { redirect } from "react-router-dom";
import { BACKEND_LOGGED, LOGIN, resolveBackendPath } from "../paths";

export async function requireAuth() {
  let data;
  try {
    data = await fetch(resolveBackendPath(BACKEND_LOGGED), {
      credentials: "include",
    });
    if (!data.ok) {
      if (data.status === 401) return redirect(LOGIN);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return redirect("/login");
  }
  return await data.json();
}
