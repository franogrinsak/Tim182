import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./App.css";
import "./components/Dashboard";
import { UserProvider } from "./components/auth/UserContext";
import LandingPage from "./components/LandingPage";
import Main from "./components/Main";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Logged from "./components/Logged";
import NotFound from "./components/pageLayout/NotFound";
import Register from "./components/Register";
import { action as registerAction } from "./components/Register";
import { action as addCourtAction } from "./components/courts/AddCourt";
import { requireAuth } from "./util/auth";
import {
  ADD_COURT,
  APP,
  COURT_DETAIL,
  COURT_NOT_FOUND,
  COURT_OWNER_ADD,
  COURT_OWNER_DETAIL,
  COURT_OWNER_PROFILE,
  COURTS,
  DASHBOARD,
  EDIT_COURT,
  EDIT_COURT_OWNER_PROFILE,
  HOME,
  LOGGED,
  ORGANIZE_TOURNAMENT,
  OWNER_COURTS,
  OWNER_PROFILE,
  OWNER_TOURNAMENTS,
  REGISTER,
  TOURNAMENT_DETAIL,
  TOURNAMENTS,
  USERS,
} from "./util/paths";
import LandingPageLayout from "./components/pageLayout/LandingPageLayout";
import Courts, {
  loader as ownerCourtsLoader,
} from "./components/courts/Courts";
import CourtDetail, {
  loader as courtDetailLoader,
} from "./components/courts/CourtDetails";
import CourtsLayout from "./components/courts/CourtsLayout";
import AddCourt from "./components/courts/AddCourt";
import EditCourt, {
  action as editCourtAction,
} from "./components/courts/EditCourt";
import OwnerProfile, {
  loader as ownerProfileLoader,
} from "./components/courts/OwnerProfile";
import Users, { loader as usersLoader } from "./components/users/Users";
import AllCourts, {
  loader as allCourtsLoader,
} from "./components/courts/AllCourts";
import EditOwnerProfile, {
  action as editOwnerProfileAction,
} from "./components/courts/EditOwnerProfile";
import EditUser, {
  action as editUserAction,
  loader as editUserLoader,
} from "./components/users/EditUser";
import AddUser, { action as addUserAction } from "./components/users/AddUser";
import Tournaments, {
  loader as ownerTournamentsLoader,
  allLoader as allTournamentsLoader,
} from "./components/tournaments/Tournaments";
import OrganizeTournament, {
  loader as organizeTournamentLoader,
  action as organizeTournamentAction,
} from "./components/tournaments/OrganizeTournament";
import TournamentDetails, {
  loader as tournamentDetailsLoader,
  action as completeTournamentAction,
} from "./components/tournaments/TournamentDetails";

function App() {
  console.log(COURT_OWNER_DETAIL);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path={HOME} element={<LandingPageLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={<NotFound link={HOME} returnText={"homepage"} />}
          />
        </Route>

        <Route path={APP} loader={async () => requireAuth()} element={<Main />}>
          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          <Route path={LOGGED} element={<Logged />} />

          {/* Register page */}
          <Route
            path={REGISTER}
            element={<Register />}
            action={registerAction}
          />

          {/* Courts UI */}
          <Route path={COURTS}>
            <Route path={OWNER_COURTS} element={<CourtsLayout />}>
              <Route index element={<Courts />} loader={ownerCourtsLoader} />
              <Route
                path={COURT_OWNER_PROFILE}
                element={<OwnerProfile />}
                loader={ownerProfileLoader}
              />
              <Route
                path={COURT_OWNER_ADD}
                element={<AddCourt />}
                action={addCourtAction}
              />
            </Route>
            <Route
              path={COURT_OWNER_DETAIL}
              element={<CourtDetail />}
              loader={courtDetailLoader}
            />
            <Route
              path={EDIT_COURT_OWNER_PROFILE}
              element={<EditOwnerProfile />}
              loader={ownerProfileLoader}
              action={editOwnerProfileAction}
            />
            <Route
              path={EDIT_COURT}
              element={<EditCourt />}
              loader={courtDetailLoader}
              action={editCourtAction}
            />
          </Route>

          <Route
            path="/app/courts/all"
            element={<AllCourts />}
            loader={allCourtsLoader}
          />

          <Route path={TOURNAMENTS}>
            <Route
              index
              element={<Tournaments />}
              loader={allTournamentsLoader}
            />
            <Route
              path={OWNER_TOURNAMENTS}
              element={<Tournaments />}
              loader={ownerTournamentsLoader}
            />
            <Route
              path={ORGANIZE_TOURNAMENT}
              element={<OrganizeTournament />}
              loader={organizeTournamentLoader}
              action={organizeTournamentAction}
            />
            <Route
              path={TOURNAMENT_DETAIL}
              element={<TournamentDetails />}
              loader={tournamentDetailsLoader}
              action={completeTournamentAction}
            />
          </Route>

          <Route path={USERS}>
            <Route index element={<Users />} loader={usersLoader} />
            <Route path="add" element={<AddUser />} action={addUserAction} />
          </Route>

          <Route
            path="users/edit/:userId"
            element={<EditUser />}
            loader={editUserLoader}
            action={editUserAction}
          />

          <Route
            path="*"
            element={<NotFound link={APP} returnText={"dashboard"} />}
          />
        </Route>
      </>
    )
  );
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
