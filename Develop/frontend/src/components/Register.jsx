import React from "react";
import { Form, useActionData, redirect, useNavigation } from "react-router-dom";
import { USER_ROLES } from "../util/constants";
import { useUser } from "./auth/UserContext";
import { DASHBOARD } from "../util/paths";
import { postRegisterData } from "../util/api/register";

export async function action({ request }) {
  const formData = await request.formData();
  const data = {
    userId: formData.get("userId"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phoneNumber: formData.get("phoneNumber"),
    roleId: formData.get("roleId"),
  };
  try {
    await postRegisterData(data);
    window.location.replace(DASHBOARD);
  } catch (err) {
    return "Failed to register, reason: " + `${err.message}`;
  }
  return null;
}

export default function Register() {
  const [isOwner, setIsOwner] = React.useState(false);
  const { user } = useUser();
  const message = useActionData();
  const navigation = useNavigation();

  // Function to change the visibility of phone number imput
  // Should only be visible when owner is the select option
  function userTypeChanged(event) {
    event.preventDefault();
    setIsOwner(event.target.value == USER_ROLES.OWNER);
  }

  return (
    <>
      <h1>Welcome</h1>
      <h2>Fill in the form to complete your registration</h2>
      <div className="register-form-container">
        <div className="w-full register-size">
          {message && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
              role="alert"
            >
              <span className="block sm:inline">{message}</span>
            </div>
          )}
          <Form
            method="post"
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <input type="hidden" name="userId" value={user?.userId || ""} />
            <div className="flex flex-wrap flex-row -mx-3 mb-6 register-layout">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 text-left"
                  htmlFor="firstName"
                >
                  First name
                </label>
                <input
                  minLength="1"
                  maxLength="50"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 text-left"
                  htmlFor="lastName"
                >
                  Last name
                </label>
                <input
                  minLength="1"
                  maxLength="50"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>
            {isOwner && (
              <div className="-mx-3 mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 text-left"
                  htmlFor="phoneNumber"
                >
                  Phone number
                </label>
                <input
                  minLength="1"
                  maxLength="50"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  title="Only digits and spaces are allowed"
                  placeholder="Phone number"
                  required
                />
              </div>
            )}

            <div className="-mx-3 mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
                htmlFor="roleId"
              >
                Register as
              </label>
              <div className="flex flex-column items-start">
                <div className="inline-block relative w-28">
                  <select
                    onChange={userTypeChanged}
                    name="roleId"
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value={USER_ROLES.PLAYER}>Player</option>
                    <option value={USER_ROLES.OWNER}>Owner</option>
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
            <button
              disabled={user && navigation.state !== "idle"}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              {navigation.state === "submitting"
                ? "Registering..."
                : "Register"}
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
