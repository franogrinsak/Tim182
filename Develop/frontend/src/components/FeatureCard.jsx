import React from "react";
import courtImage from "../assets/court.png";
import padelRacketImage from "../assets/padelracket.png";
import trophyImage from "../assets/trophy.png";
import usersImage from "../assets/users.png";
import { Link } from "react-router-dom";

export function getOwnerCourtsCard(ownerId) {
  return (
    <FeatureCard
      key={3}
      link={`courts/${ownerId}`}
      imageUrl={courtImage}
      title="Your courts"
      text="Register your courts to attract clients, manage bookings, and showcase available playtimes directly on your profile."
    />
  );
}

export const PLAYER_COURTS = (
  <FeatureCard
    key={1}
    link="courts"
    imageUrl={padelRacketImage}
    title="Courts"
    text="Find nearby padel courts and book the perfect time to play with friends. Join the fun, improve your game, and connect."
  />
);
export const PLAYER_TOURNAMENT = (
  <FeatureCard
    key={2}
    link="tournaments"
    imageUrl={trophyImage}
    title="Tournaments"
    text="Discover open padel tournaments to join and track results, including your own past matches and other players’ performances."
  />
);
export const OWNER_COURTS = (
  <FeatureCard
    key={3}
    link="courts"
    imageUrl={courtImage}
    title="Your courts"
    text="Register your courts to attract clients, manage bookings, and showcase available playtimes directly on your profile."
  />
);
export const OWNER_TOURNAMENT = (
  <FeatureCard
    key={4}
    link="tournament"
    imageUrl={trophyImage}
    title="Your tournaments"
    text="Host exciting tournaments on your courts, allowing players to join, compete, and enjoy a professionally organized event."
  />
);
export const ADMINISTRATOR_USERS = (
  <FeatureCard
    key={5}
    link="users"
    imageUrl={usersImage}
    title="Manage users"
    text="View, add, edit or remove registered users with ease, managing the complete list of profiles directly from your admin panel."
  />
);

export default function FeatureCard({ link, imageUrl, title, text }) {
  return (
    <Link to={link}>
      <article className="flex flex-col flex-wrap items-center feature-card rounded-md m-6">
        <img className="feature-card-image mb-6" src={imageUrl}></img>
        <h3 className="mb-3">{title}</h3>
        <p>{text}</p>
      </article>
    </Link>
  );
}
