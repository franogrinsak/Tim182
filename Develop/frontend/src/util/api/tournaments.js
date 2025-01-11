import {
  BACKEND_ADD_TOURNAMENT,
  BACKEND_ALL_TOURNAMENTS,
  BACKEND_FINISH_TOURNAMENT,
  BACKEND_OWNERS_TOURNAMENTS,
  BACKEND_TOURNAMENT_DETAILS,
} from "../paths";
import { get, getWithParams, postDataBody } from "./fetch-requests";

export async function getTournamentsForOwners(data) {
  return await getWithParams(BACKEND_OWNERS_TOURNAMENTS, data);
}

export async function postNewTournament(data) {
  await postDataBody(BACKEND_ADD_TOURNAMENT, data);
}

export async function getAllTournaments() {
  return await get(BACKEND_ALL_TOURNAMENTS);
}

export async function getTournamentDetails(data) {
  return await getWithParams(BACKEND_TOURNAMENT_DETAILS, data);
}

export async function postCompleteTournament(data) {
  await postDataBody(BACKEND_FINISH_TOURNAMENT, data);
}
