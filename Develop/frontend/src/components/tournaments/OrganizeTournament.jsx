import React from "react";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { useUser } from "../auth/UserContext";
import { getCourtsForOwners, postNewTournament } from "../../util/api";

export async function loader({ params }) {
  const { ownerId } = params;
  const data = new URLSearchParams();
  data.append("userId", ownerId);
  return await getCourtsForOwners(data.toString());
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = {
    tournamentName: formData.get("tournamentName"),
    playerLevel: formData.get("playerLevel"),
    description: formData.get("description"),
    registrationFee: formData.get("registrationFee") || "0.00",
    reward: formData.get("reward") || "0.00",
    date: formData.get("date"),
    user: {
      userId: formData.get("userId"),
    },
    court: {
      courtId: formData.get("courtId"),
    },
  };
  try {
    await postNewTournament(data);
    return redirect("/app/tournaments/" + data.user.userId);
  } catch (err) {
    console.log(err);
    return (
      "Failed to organize tournament, reason: " + `${err.status} ${err.message}`
    );
  }
}

export default function OrganizeTournament() {
  const { user } = useUser();
  const navigation = useNavigation();
  let courts = useLoaderData();
  const message = useActionData();
  let noCourts = false;
  if (courts == []) {
    courts = [{ courtId: 0, courtName: "You have no courts" }];
    noCourts = true;
  }

  return (
    <>
      <h2 className="text-xl">Organize a tournament</h2>
      {message && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
          role="alert"
        >
          <span className="block sm:inline">{message}</span>
        </div>
      )}
      <div className="register-form-container">
        <div className="w-full register-size">
          <Form
            method="post"
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <input type="hidden" name="userId" value={user?.userId || ""} />
            <div className="-mx-3 mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
                htmlFor="tournamentName"
              >
                Tournament name
              </label>
              <input
                minLength="1"
                maxLength="50"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="tournamentName"
                name="tournamentName"
                type="text"
                placeholder="Tournament name"
                required
              />
            </div>
            <div className="-mx-3 mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
                htmlFor="playerLevel"
              >
                Player level
              </label>
              <input
                minLength="1"
                maxLength="20"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="playerLevel"
                name="playerLevel"
                type="text"
                placeholder="Player level"
                required
              />
            </div>
            <div className="-mx-3 mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
                htmlFor="description"
              >
                Tournament description
              </label>
              <textarea
                id="message"
                rows="4"
                name="description"
                className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Tournament description"
              ></textarea>
            </div>
            <div className="flex">
              {" "}
              <div className="-mx-3 mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 text-left"
                  htmlFor="registrationFee"
                >
                  Registration fee
                </label>
                <div className="w-24">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                      €
                    </div>
                    <input
                      type="text"
                      name="registrationFee"
                      id="registrationFee"
                      className="grow block min-w-0 py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
              <div className="mx-10 mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 text-left"
                  htmlFor="reward"
                >
                  Reward
                </label>
                <div className="w-24">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                      €
                    </div>
                    <input
                      type="text"
                      name="reward"
                      id="reward"
                      className="grow block min-w-0 py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="-mx-3 mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
                htmlFor="courtId"
              >
                Location
              </label>
              <div className="flex flex-column items-start">
                <div className="inline-block relative w-full">
                  <select
                    name="courtId"
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {courts.map((court) => {
                      return (
                        <option value={court.courtId} key={court.courtId}>
                          {court.courtName}
                        </option>
                      );
                    })}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="-mx-3 mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
                htmlFor="playerLevel"
              >
                Date
              </label>
              <div className="flex">
                <input
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="date"
                  id="date"
                  name="date"
                  required
                />
              </div>
            </div>
            <button
              disabled={user && navigation.state !== "idle" && !noCourts}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              {navigation.state === "submitting" ? "Organizing..." : "Organize"}
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
