import React from "react";
import { useUser } from "../auth/UserContext";
import {
  Link,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {
  getAppliction,
  getTournamentDetails,
  postCompleteTournament,
  postSignUpToTournament,
} from "../../util/api";
import CompleteTournament from "./CompleteTournament";
import { Button } from "@material-tailwind/react";
import { isPlayer } from "../../util/users";

export async function loader({ params }) {
  const { tournamentId } = params;
  const data = new URLSearchParams();
  data.append("tournamentId", tournamentId);
  return await getTournamentDetails(data.toString());
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = {
    userId: formData.get("userId"),
    tournamentId: formData.get("tournamentId"),
    results: formData.get("results"),
  };
  try {
    await postCompleteTournament(data);
    return redirect(
      "/app/tournaments/" + data.userId + "/" + data.tournamentId
    );
  } catch (err) {
    return "Failed to register, reason: " + `${err.status} ${err.message}`;
  }
}

export default function TournamentDetails() {
  const { user } = useUser();
  const { tournamentId } = useParams();
  const { tournament } = useOutletContext();
  const ownerProfilePath = "/app/courts/" + tournament?.user?.userId;
  const courtProfilePath = ownerProfilePath + "/" + tournament?.court?.courtId;
  const [application, setApplication] = React.useState();
  const [signingUp, setSigningUp] = React.useState(false);
  const [loadingApplication, setLoadingApplication] = React.useState(true);

  async function getApplication() {
    const data = new URLSearchParams();
    data.append("userId", user.userId);
    data.append("tournamentId", tournamentId);
    const app = await getAppliction(data);
    setApplication(app);
  }

  React.useEffect(() => {
    setLoadingApplication(true);
    if (user && isPlayer(user)) getApplication();
    setLoadingApplication(false);
  }, [JSON.stringify(user)]);

  async function signUpForTournament() {
    setSigningUp(true);
    const data = {
      tournament: {
        tournamentId: tournamentId,
      },
      user: {
        userId: user.userId,
      },
    };
    await postSignUpToTournament(data);
    await getApplication();
    setSigningUp(false);
  }

  return (
    <section className="flex flex-col items-center">
      {user &&
        isPlayer(user) &&
        !application &&
        tournament.open &&
        !loadingApplication && (
          <Button loading={signingUp} onClick={signUpForTournament}>
            Apply to tournament
          </Button>
        )}
      {application && application.approved && tournament.open && (
        <h2>Your application is approved</h2>
      )}
      {application && !application.approved && tournament.open && (
        <h2>Your application is waiting for approval</h2>
      )}
      <div>
        <div className="px-4 sm:px-0">
          <p className="mt-1 text-3xl text-neutral-950 text-center w-full">
            {tournament.tournamentName}
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100 text-left">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Concluded</dt>

              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {!tournament.open ? "Yes" : "No"}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Organizer</dt>

              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                <Link to={ownerProfilePath + "/profile"}>
                  {`${tournament?.user?.firstName} ${tournament?.user?.lastName}`}
                </Link>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Location</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                <Link to={courtProfilePath}>
                  {tournament.court.courtName}, {tournament.court.location}
                </Link>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Date</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {tournament.date}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Registration fee
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {tournament.registrationFee} €
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Reward</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {tournament.registrationFee} €
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Player level
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {tournament.playerLevel}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Description
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 max-w-lg">
                {tournament.description}
              </dd>
            </div>
            {tournament.results && (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Results</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 max-w-lg">
                  {tournament.results}
                </dd>
              </div>
            )}
          </dl>
        </div>
        {tournament.open && (
          <CompleteTournament
            tournamentId={tournament.tournamentId}
            userId={tournament?.user?.userId}
          />
        )}
      </div>
    </section>
  );
}
