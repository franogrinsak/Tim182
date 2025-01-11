import React from "react";
import {
  List,
  ListItem,
  Card,
  ListItemSuffix,
  IconButton,
  Typography,
  Spinner,
  Button,
} from "@material-tailwind/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { TOURNAMENTS } from "../../util/paths";
import {
  getNotifications,
  postDeleteNotifications,
  postMarkNotifications,
} from "../../util/api/notifications";

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

export async function loader({ params }) {
  const { playerId } = params;
  const data = new URLSearchParams();
  data.append("userId", playerId);
  return await getNotifications(data.toString());
}

export default function Notifications() {
  const notifications = useLoaderData();
  const [deleteing, setDeleteing] = React.useState(false);
  const [currentItemDelete, setCurrentItemDelete] = React.useState();
  const [marking, setMarking] = React.useState(false);
  const [currentItemMark, setCurrentItemMark] = React.useState();
  const navigate = useNavigate();

  async function markNotifications(notifications, currentNotificationId) {
    setMarking(true);
    setCurrentItemMark(currentNotificationId);
    console.log(
      notifications.map((notification) => ({
        notificationId: notification.notificationId,
      }))
    );
    const success = await postMarkNotifications(
      notifications.map((notification) => notification.notificationId)
    );
    if (success) {
      window.location.reload();
      return;
    }
    setMarking(false);
    setCurrentItemMark(null);
  }

  async function deleteNotifications(notifications, currentNotificationId) {
    setDeleteing(true);
    setCurrentItemDelete(currentNotificationId);
    console.log(
      notifications.map((notification) => ({
        notificationId: notification.notificationId,
      }))
    );
    const success = await postDeleteNotifications(
      notifications.map((notification) => notification.notificationId)
    );
    if (success) {
      window.location.reload();
      return;
    }
    setDeleteing(false);
    setCurrentItemDelete(null);
  }

  return (
    <section className="flex justify-center m-5">
      {notifications.length != 0 && (
        <Card className="w-96 mx-2">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Tournament notifications
          </Typography>
          <List>
            {notifications.map((notification) => {
              return (
                <ListItem
                  className={!notification.read ? "marked-notification" : ""}
                  key={`${notification.notificationId}`}
                  onClick={() =>
                    navigate(
                      `${TOURNAMENTS}/${notification.tournament.user.userId}/${notification.tournament.tournamentId}`
                    )
                  }
                >
                  {notification.tournament.tournamentName} is being held
                  <ListItemSuffix className="flex">
                    {currentItemMark != notification.notificationId &&
                      !notification.read && (
                        <IconButton
                          variant="text"
                          color="blue"
                          onClick={() =>
                            markNotifications(
                              [notification],
                              notification.notificationId
                            )
                          }
                          disabled={marking || deleteing}
                        >
                          <CheckIcon />
                        </IconButton>
                      )}
                    {currentItemMark == notification.notificationId &&
                      marking && (
                        <Spinner color="blue" className="h-10 w-10 p-2" />
                      )}
                    {currentItemDelete != notification.notificationId && (
                      <IconButton
                        variant="text"
                        color="red"
                        onClick={() =>
                          deleteNotifications(
                            [notification],
                            notification.notificationId
                          )
                        }
                        disabled={marking || deleteing}
                      >
                        <TrashIcon />
                      </IconButton>
                    )}
                    {currentItemDelete == notification.notificationId &&
                      deleteing && (
                        <Spinner color="red" className="h-10 w-10 p-2" />
                      )}
                  </ListItemSuffix>
                </ListItem>
              );
            })}
          </List>
          <div className="flex justify-between">
            <Button
              className="m-3"
              color="blue"
              loading={currentItemMark == 0}
              disabled={marking || deleteing}
              onClick={() => markNotifications(notifications, 0)}
            >
              Mark all as read
            </Button>
            <Button
              className="m-3"
              color="red"
              loading={currentItemDelete == 0}
              disabled={marking || deleteing}
              onClick={() => deleteNotifications(notifications, 0)}
            >
              Delete all
            </Button>
          </div>
        </Card>
      )}
      {notifications.length == 0 && <h2>You have no notifications.</h2>}
    </section>
  );
}
