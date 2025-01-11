import React from "react";

import {
  getApplication,
  postSignUpToTournament,
} from "../../util/api/participations";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "@material-tailwind/react";

export default function ApplicationButton(props) {
  const [application, setApplication] = React.useState();
  const [loadingApplication, setLoadingApplication] = React.useState(true);
  const [signingUp, setSigningUp] = React.useState(false);
  const { user, tournament } = props;

  async function getApplicationLocal() {
    const data = new URLSearchParams();
    data.append("userId", user.userId);
    data.append("tournamentId", tournament.tournamentId);
    setLoadingApplication(true);
    const app = await getApplication(data);
    setApplication(app);
    setLoadingApplication(false);
  }

  React.useEffect(() => {
    getApplicationLocal();
  }, []);

  async function signUpForTournament() {
    setSigningUp(true);
    const data = {
      tournament: {
        tournamentId: tournament.tournamentId,
      },
      user: {
        userId: user.userId,
      },
    };
    const success = await postSignUpToTournament(data);
    if (!success) return;
    await getApplicationLocal();
    setSigningUp(false);
  }

  return (
    <>
      {!loadingApplication && (
        <div>
          {!application && (
            <Button loading={signingUp} onClick={signUpForTournament}>
              Apply to tournament
            </Button>
          )}
          {application && application.approved && tournament.open && (
            <h2 onClick={() => getApplicationLocal()}>
              Your application is approved
            </h2>
          )}
          {application &&
            !application.approved &&
            !application.denied &&
            tournament.open && (
              <h2>Your application is waiting for approval</h2>
            )}
          {application &&
            !application.approved &&
            application.denied &&
            tournament.open && <h2>Your application is denied</h2>}
        </div>
      )}
      {loadingApplication && (
        <ProgressSpinner
          style={{ width: "2rem", height: "2rem" }}
          strokeWidth="8"
          fill="var(--surface-ground)"
          animationDuration=".5s"
        />
      )}
    </>
  );
}
