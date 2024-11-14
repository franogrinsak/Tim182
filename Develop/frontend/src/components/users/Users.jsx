import React from "react";

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { USER_ROLES_NAMES } from "../../util/constants";
import { getAllUsers } from "../../util/api";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  return await getAllUsers();
}

const nodesTemp = [
  {
    id: "0",
    userId: 1,
    firstName: "Play",
    lastName: "Padel",
    email: "playpadel182@gmail.com",
    roleId: 4,
    phoneNumber: null,
  },
  {
    id: "1",
    userId: 1,
    firstName: "Play",
    lastName: "Padel",
    email: "playpadel182@gmail.com",
    roleId: 4,
    phoneNumber: null,
  },
  {
    id: "2",
    userId: 1,
    firstName: "Play",
    lastName: "Padel",
    email: "playpadel182@gmail.com",
    roleId: 4,
    phoneNumber: null,
  },
  {
    id: "3",
    userId: 1,
    firstName: "Play",
    lastName: "Padel",
    email: "playpadel182@gmail.com",
    roleId: 4,
    phoneNumber: null,
  },
  {
    id: "4",
    userId: 1,
    firstName: "Play",
    lastName: "Padel",
    email: "playpadel182@gmail.com",
    roleId: 4,
    phoneNumber: null,
  },
  {
    id: "5",
    userId: 1,
    firstName: "Play",
    lastName: "Padel",
    email: "playpadel182@gmail.com",
    roleId: 4,
    phoneNumber: null,
  },
];

export default function Users() {
  const nodes = useLoaderData();
  for (let i = 0; i < nodes.length; ++i) {
    nodes[i] = { ...nodes[i], id: i + 1 };
  }
  console.log(nodes);
  const data = { nodes };

  const theme = useTheme(getTheme());

  const COLUMNS = [
    { label: "User ID", renderCell: (user) => user.userId },
    {
      label: "Name",
      renderCell: (user) => `${user.firstName} ${user.lastName}`,
    },
    { label: "Email", renderCell: (user) => user.email },
    {
      label: "Role",
      renderCell: (user) => USER_ROLES_NAMES[user.roleId],
    },
    {
      label: "Phone number",
      renderCell: (user) => user?.phoneNumber || "N/A",
    },
    {
      label: "Edit",
      renderCell: (user) => <Link to={"edit/" + user.userId}>E</Link>,
    },
    /*
    {
      label: "Delete",
      renderCell: (user) => "TODO",
    },
    */
  ];

  return (
    <section className="flex justify-center">
      <Link to="add">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Add user
        </button>
      </Link>

      <div className="users-table-container p-6 max-w-5xl shadow-md sm:rounded-lg">
        All users
        <CompactTable columns={COLUMNS} data={data} theme={theme} />
      </div>
    </section>
  );
}
