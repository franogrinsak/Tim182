import { redirect } from "react-router-dom";
import { LOGGED } from "./paths";

export async function requireAuth() {
  let data;
  try {
    data = await fetch(resolveBackendPath(LOGGED), {
      credentials: "include",
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return redirect("/login?message=Login to access this resource");
  }
  return await data.json();
}
