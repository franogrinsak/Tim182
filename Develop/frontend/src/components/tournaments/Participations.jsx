import React from "react";
import { getTournamentApplictions } from "../../util/api";
import { useLoaderData } from "react-router-dom";
import ParticipationsList from "./ParticipationsList";

export async function loader({ params }) {
  const { tournamentId } = params;
  const data = new URLSearchParams();
  data.append("tournamentId", tournamentId);
  const participations = await getTournamentApplictions(data.toString());
  return {
    unapprovedParticipations: participations.filter(
      (participation) => !participation.approved
    ),
    approvedParticipations: participations.filter(
      (participation) => participation.approved
    ),
  };
}

export default function Participations() {
  const { unapprovedParticipations, approvedParticipations } = useLoaderData();
  const [approving, setApproving] = React.useState(false);
  const [denying, setDenying] = React.useState(false);
  const [currentItemApprove, setCurrentItemApprove] = React.useState(0);
  const [currentItemDeny, setCurrentItemDeny] = React.useState(0);

  console.log(approvedParticipations);
  return (
    <section className="flex justify-center flex-row wrap my-6">
      {unapprovedParticipations.length == 0 &&
        approvedParticipations.length == 0 && <h2>No applications yet</h2>}
      <ParticipationsList
        title="Applications"
        approved={false}
        participations={unapprovedParticipations}
        approving={approving}
        setApproving={setApproving}
        denying={denying}
        setDenying={setDenying}
        currentItemApprove={currentItemApprove}
        setCurrentItemApprove={setCurrentItemApprove}
        currentItemDeny={currentItemDeny}
        setCurrentItemDeny={setCurrentItemDeny}
      />
      <ParticipationsList
        title="Approved applications"
        approved={true}
        participations={approvedParticipations}
        approving={approving}
        setApproving={setApproving}
        denying={denying}
        setDenying={setDenying}
        currentItemApprove={currentItemApprove}
        setCurrentItemApprove={setCurrentItemApprove}
        currentItemDeny={currentItemDeny}
        setCurrentItemDeny={setCurrentItemDeny}
      />
    </section>
  );
}
