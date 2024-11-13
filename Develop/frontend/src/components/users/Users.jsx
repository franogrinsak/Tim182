import React from "react";

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { USER_ROLES_NAMES } from "../../util/constants";

const nodes = [
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
      renderCell: (user) => user?.phoneNumber || "N/A",
    },
    {
      label: "Delete",
      renderCell: (user) => user?.phoneNumber || "N/A",
    },
  ];

  return (
    <section className="flex justify-center">
      <div className="users-table-container p-6 max-w-5xl shadow-md sm:rounded-lg">
        {" "}
        <CompactTable columns={COLUMNS} data={data} theme={theme} />
      </div>
    </section>
  );
}
