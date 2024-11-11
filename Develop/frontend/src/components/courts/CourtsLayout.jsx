import React from "react";
import { Outlet } from "react-router-dom";
import TabNavigation from "./TabNavigation";

export default function CourtsLayout() {
  return (
    <>
      <TabNavigation />
      <Outlet />
    </>
  );
}
