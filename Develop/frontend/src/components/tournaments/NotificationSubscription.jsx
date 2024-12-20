import { InputSwitch } from "primereact/inputswitch";
import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";
import {
  getIsSubscribedToTournaments,
  postSetIsSubscribedToTournaments,
} from "../../util/api";

export default function NotificationSubscription(props) {
  const { user } = props;
  const [checked, setChecked] = React.useState(false);
  const [loading, isLoading] = React.useState(true);
  const [changing, setChanging] = React.useState(false);

  async function check(e) {
    setChanging(true);
    const data = new URLSearchParams();
    data.append("userId", user.userId);
    data.append("isSubscribedToTournaments", e.value);
    await postSetIsSubscribedToTournaments(data);
    setChecked(e.value);
    setChanging(false);
  }

  React.useEffect(() => {
    async function getSubsribed() {
      isLoading(true);
      const data = new URLSearchParams();
      data.append("userId", user.userId);
      const subscribed = await getIsSubscribedToTournaments(data);
      setChecked(subscribed);
      isLoading(false);
    }

    getSubsribed();
  }, []);
  return (
    <div className="card flex justify-center relative items-center">
      <div className="relative">
        {!loading && (
          <InputSwitch
            className="relative"
            checked={checked}
            onChange={check}
            disabled={changing}
          />
        )}
        <div className="flex justify-start h-7 absolute top-0 left-full ml-2 w-72">
          <span className="w-96 text-left">
            Get new tournament notifications
          </span>
          {changing && (
            <ProgressSpinner
              className="h-7 w-7 -ml-36"
              strokeWidth="4"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
        </div>
      </div>
      {loading && (
        <ProgressSpinner
          className="m-0 h-7 w-7 mx-2"
          strokeWidth="8"
          fill="var(--surface-ground)"
          animationDuration=".5s"
        />
      )}
    </div>
  );
}
