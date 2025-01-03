import React from "react";
import { NavLink } from "react-router-dom";
import {
  ALL_COURTS,
  COURTS,
  LOGOUT,
  MEMBERSHIP,
  resolveBackendPath,
  TOURNAMENTS,
  USERS,
} from "../../util/paths";
import { USER_ROLES } from "../../util/constants";

const ACTIVE_STYLE = "text-blue-500 hover:text-blue-500";
const INACTIVE_STYLE = "text-green-500 hover:text-green-500";

const PLAYER_LINKS = [
  <DekstopLink key={1} text="Courts" link={ALL_COURTS} />,
  <DekstopLink key={2} text="Tournaments" link={TOURNAMENTS} />,
];

function getOwnerLinks(user) {
  return [
    <DekstopLink key={3} text="Courts" link={`${COURTS}/${user.userId}`} />,
    <DekstopLink
      key={4}
      text="Tournaments"
      link={`${TOURNAMENTS}/${user.userId}`}
    />,
  ];
}

const ADMIN_LINKS = [
  <DekstopLink key={5} text="Manage users" link={USERS} />,
  <DekstopLink key={6} text="Membership" link={MEMBERSHIP} />,
];

function DekstopLink(props) {
  return (
    <NavLink
      className={({ isActive }) => (isActive ? ACTIVE_STYLE : INACTIVE_STYLE)}
      to={props.link}
    >
      {props.text}
    </NavLink>
  );
}

export function getLinks(user) {
  switch (user.roleId) {
    case USER_ROLES.PLAYER:
      return PLAYER_LINKS;
    case USER_ROLES.OWNER:
      return getOwnerLinks(user);
    case USER_ROLES.ADMIN:
      return ADMIN_LINKS;
    case USER_ROLES.NEW_USER:
      return [];
    case USER_ROLES.UNPAID_OWNER:
      return [];
    default:
      return [];
  }
}

export default function DesktopDashboardHeader(props) {
  const { user, name } = props;
  return (
    <>
      {getLinks(user)}
      <a className={INACTIVE_STYLE} href={resolveBackendPath(LOGOUT)}>
        Logout
      </a>
      {user.roleId != USER_ROLES.NEW_USER && (
        <div className="user-name">{name}</div>
      )}
    </>
  );
}
