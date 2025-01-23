import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import TournamentsTable from "./TournamentsTable";
import { useUser } from "../auth/UserContext";
import { isBeforeToday, isToday } from "../../util/date";
import TournamentNav from "./TournamentNav";
import { isOwner, isPlayer } from "../../util/users";
import NotificationSubscription from "./NotificationSubscription";
import {
  getAllTournaments,
  getTournamentsForOwners,
} from "../../util/api/tournaments";
import { getTournamentApplicationsPlayer } from "../../util/api/participations";

export async function loader({ params }) {
  const { ownerId } = params;
  const data = new URLSearchParams();
  data.append("userId", ownerId);
  return await getTournamentsForOwners(data.toString());
}

export async function allLoader() {
  return await getAllTournaments();
}

export const VIEWS = {
  OPEN: "open",
  TODAY: "today",
  PLAYED: "played",
  PLAYER: "player",
};

export default function Tournaments() {
  const { user } = useUser();
  const tournaments = useLoaderData();
  const openTournaments = [];
  const playedTournaments = [];
  const ongoingTournaments = [];
  const playerTournaments = [];
  const [playerApplications, setPlayerApplications] = React.useState();
  tournaments?.forEach((tournament) => {
    if (user && isPlayer(user) && playerApplications) {
      if (
        playerApplications.some(
          (application) =>
            application.tournament.tournamentId == tournament.tournamentId
        )
      ) {
        playerTournaments.push(tournament);
        return;
      }
    }

    if (!tournament.open) {
      playedTournaments.push(tournament);
      return;
    }

    if (isToday(tournament.date) || isBeforeToday(tournament.date)) {
      ongoingTournaments.push(tournament);
      return;
    }

    openTournaments.push(tournament);
  });

  React.useEffect(() => {
    async function getApplications() {
      const data = new URLSearchParams();
      data.append("userId", user.userId);
      const response = await getTournamentApplicationsPlayer(data);
      if (!response) return;
      setPlayerApplications(response);
    }

    if (user && isPlayer(user)) {
      getApplications();
    }
  }, [JSON.stringify(user)]);

  const [currentView, setCurrentView] = React.useState(VIEWS.OPEN);
  return (
    <section className="h-full">
      {user && isOwner(user) && (
        <Link to="organize">
          <button className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Organize a tournament
          </button>
        </Link>
      )}
      {user && isPlayer(user) && <NotificationSubscription user={user} />}
      <TournamentNav
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      {currentView == VIEWS.OPEN && (
        <TournamentsTable tournaments={openTournaments} />
      )}
      {currentView == VIEWS.TODAY && (
        <TournamentsTable tournaments={ongoingTournaments} />
      )}
      {currentView == VIEWS.PLAYED && (
        <TournamentsTable tournaments={playedTournaments} />
      )}
      {user && isPlayer(user) && currentView == VIEWS.PLAYER && (
        <TournamentsTable tournaments={playerTournaments} />
      )}
    </section>
  );
}
