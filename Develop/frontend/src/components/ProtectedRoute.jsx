import React from "react";
import { useUser } from "./auth/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useUser();

  if (!user) {
    return <ProgressSpinner />;
  }

  if (user && allowedRoles.includes(user.roleId)) {
    return <Outlet />;
  }

  return <Navigate to="/app/not-found" replace />;
}
