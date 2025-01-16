import React from "react";
import {
  List,
  ListItem,
  Card,
  ListItemSuffix,
  IconButton,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import {
  postApproveParticipation,
  postDenyParticipation,
} from "../../util/api/participations";

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-9 w-9"
    >
      <path
        fill="currentColor"
        d="M10.586 13.414l-2.829-2.828L6.343 12l4.243 4.243 7.07-7.071-1.413-1.415-5.657 5.657z"
      />
    </svg>
  );
}

export default function ParticipationsList(props) {
  const {
    approved,
    title,
    participations,
    approving,
    setApproving,
    denying,
    setDenying,
    currentItemApprove,
    setCurrentItemApprove,
    currentItemDeny,
    setCurrentItemDeny,
  } = props;

  async function denyApplication(participation) {
    setDenying(true);
    setCurrentItemDeny(participation.user.userId);
    const success = await postDenyParticipation(participation);
    if (success) window.location.reload();
  }

  async function approveApplication(participation) {
    setApproving(true);
    setCurrentItemApprove(participation.user.userId);
    const success = await postApproveParticipation(participation);
    if (success) window.location.reload();
  }
  return (
    <>
      {participations.length != 0 && (
        <Card className="w-96 mx-2">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {title}
          </Typography>
          <List>
            {participations.map((participation) => {
              return (
                <ListItem key={`${participation.user.userId}`}>
                  {`${participation.user.firstName} ${participation.user.lastName}`}
                  <ListItemSuffix className="flex">
                    {!approved &&
                      currentItemApprove != participation.user.userId &&
                      !approving && (
                        <IconButton
                          variant="text"
                          color="green"
                          onClick={() => approveApplication(participation)}
                          disabled={approving || denying}
                        >
                          <CheckIcon />
                        </IconButton>
                      )}
                    {!approved &&
                      currentItemApprove == participation.user.userId &&
                      approving && (
                        <Spinner color="green" className="h-10 w-10 p-2" />
                      )}
                    {currentItemDeny != participation.user.userId &&
                      !denying && (
                        <IconButton
                          variant="text"
                          color="red"
                          onClick={() => denyApplication(participation)}
                          disabled={approving || denying}
                        >
                          <TrashIcon />
                        </IconButton>
                      )}
                    {currentItemDeny == participation.user.userId &&
                      denying && (
                        <Spinner color="red" className="h-10 w-10 p-2" />
                      )}
                  </ListItemSuffix>
                </ListItem>
              );
            })}
          </List>
        </Card>
      )}
    </>
  );
}
