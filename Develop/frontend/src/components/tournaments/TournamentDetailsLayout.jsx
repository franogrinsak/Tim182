import React from "react";
import TournamentDetailsNav from "./TournamentDetailsNav";
import { Outlet, useLoaderData } from "react-router-dom";

export function TournamentDetailsLayout() {
  const tournament = useLoaderData();
  return (
    <div className="h-full flex flex-col justify-start">
      <TournamentDetailsNav tournament={tournament} />
      <Outlet context={{ tournament: tournament }} />
    </div>
  );
}
