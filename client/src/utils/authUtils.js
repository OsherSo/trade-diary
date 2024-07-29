import { redirect } from "react-router-dom";
import customFetch from "./customFetch";

export const authCheckLoader = async () => {
  try {
    // Attempt to fetch the current user's data
    await customFetch.get("/users/current-user");
    // If successful, the user is logged in, so redirect to dashboard
    return redirect("/dashboard");
  } catch (error) {
    // If there's an error (e.g., 401 Unauthorized), the user is not logged in
    // So we return null to allow the login/register page to render
    return null;
  }
};
