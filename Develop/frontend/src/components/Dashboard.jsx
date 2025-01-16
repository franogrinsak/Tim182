import React from "react";
import { useUser } from "./auth/UserContext";
import { getFeatureCards, USER_ROLES } from "../util/constants";
import { useNavigate } from "react-router-dom";
import { PURCHASE_MEMBERSHIP, REGISTER } from "../util/paths";

export default function Dashboard() {
  const { user } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      user?.roleId === USER_ROLES.NONE ||
      user?.roleId === USER_ROLES.NEW_USER
    )
      navigate(REGISTER);

    if (user?.roleId === USER_ROLES.UNPAID_OWNER) navigate(PURCHASE_MEMBERSHIP);
  }, [JSON.stringify(user)]);
  return (
    <>
      <section className="flex flex-wrap justify-center feature-cards-container">
        {user && getFeatureCards(user)}
      </section>
    </>
  );
}
