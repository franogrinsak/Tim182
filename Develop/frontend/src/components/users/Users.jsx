import React from "react";

import { USER_ROLES_NAMES } from "../../util/constants";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { USERS } from "../../util/paths";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getAllUsers, postDeleteUser } from "../../util/api/users";

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

export async function action({ request }) {
  const formData = await request.formData();
  const data = new URLSearchParams();
  data.append("userId", formData.get("userId"));
  try {
    await postDeleteUser(data);
  } catch (err) {
    return "Failed to delete the user: " + err.message;
  }
  window.location.reload();
  return null;
}

export async function loader() {
  const users = await getAllUsers();
  if (users instanceof Response) return users;
  return users.map((user) => {
    return {
      ...user,
      fullName: `${user.firstName} ${user.lastName}`,
      phoneNumber: user.phoneNumber ? user.phoneNumber : "N/A",
      roleName: USER_ROLES_NAMES[user.roleId],
    };
  });
}

export default function Users() {
  const nodes = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const error = useActionData();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState();

  const handleOpen = () => setOpenDialog((last) => !last);

  function askForDeletionUser(user) {
    setOpenDialog(true);
    setCurrentUser(user);
  }

  const [filters, setFilters] = React.useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValue, setGlobalFilterValue] = React.useState("");

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <IconField iconPosition="left">
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    );
  };
  const header = renderHeader();

  return (
    <section>
      <h2 className="text-4xl mb-4">All users</h2>
      <Link to="add">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Add user
        </button>
      </Link>

      <div className="card max-w-screen-xl mx-auto my-0 shadow-md rounded-lg p-8">
        <DataTable
          size="small"
          value={nodes}
          paginator
          rows={5}
          onRowClick={(row) => navigate(`${USERS}/edit/${row.data.userId}`)}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
          header={header}
          filters={filters}
          globalFilterFields={[
            "userId",
            "fullName",
            "email",
            "roleName",
            "phoneNumber",
          ]}
          emptyMessage="No users found."
        >
          <Column sortable field="userId" header="User ID"></Column>
          <Column sortable field="fullName" header="Name"></Column>
          <Column sortable field="email" header="E-mail"></Column>
          <Column sortable field="roleName" header="Role"></Column>
          <Column sortable field="phoneNumber" header="Phone number"></Column>
          <Column
            body={(row) => (
              <IconButton
                variant="text"
                color="red"
                onClick={(event) => {
                  event.stopPropagation();
                  askForDeletionUser(row);
                }}
                disabled={navigation.state === "submitting"}
              >
                <TrashIcon />
              </IconButton>
            )}
            header="Delete"
          ></Column>
        </DataTable>
      </div>
      <Dialog
        size="sm"
        open={navigation.state === "submitting" || openDialog}
        handler={handleOpen}
        className="p-4"
      >
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Delete user
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Are you sure you want to delete the user {currentUser?.fullName}?
          </Typography>
        </DialogBody>

        <DialogFooter>
          <Form method="post">
            <input
              type="hidden"
              name="userId"
              value={currentUser?.userId || ""}
            />
            <Button
              className="ml-auto"
              color="red"
              type="submit"
              loading={navigation.state === "submitting"}
            >
              Delete user
            </Button>
          </Form>
        </DialogFooter>
      </Dialog>
    </section>
  );
}
