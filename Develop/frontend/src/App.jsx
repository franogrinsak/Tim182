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
  MEMBERSHIP,
  ORGANIZE_TOURNAMENT,
  OWNER_COURTS,
  OWNER_PROFILE,
  OWNER_TOURNAMENTS,
  PLAYER_NOTIFICATIONS,
  PURCHASE_MEMBERSHIP,
  REGISTER,
  TOURNAMENT_DETAIL,
  TOURNAMENT_MEDIA,
  TOURNAMENT_PARTICIPATIONS,
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
import { TournamentDetailsLayout } from "./components/tournaments/TournamentDetailsLayout";
import Participations, {
  loader as participationsLoader,
} from "./components/tournaments/Participations";
import TournamentMedia, {
  loader as torunamentMediaLoader,
  action as tournamentMediaAction,
} from "./components/tournaments/TournamentMedia";
import Notifications, {
  loader as notificationsLoader,
} from "./components/notifications/Notifications";
import EditMembership, {
  loader as editMembershipLoader,
  action as editMembershipAction,
} from "./components/membership/EditMembership";
import PurchaseMembership from "./components/membership/PurchaseMembership";

function App() {
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

          {/* Tournaments UI */}
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
              element={<TournamentDetailsLayout />}
              loader={tournamentDetailsLoader}
            >
              <Route
                index
                element={<TournamentDetails />}
                action={completeTournamentAction}
              />
              <Route
                path={TOURNAMENT_PARTICIPATIONS}
                element={<Participations />}
                loader={participationsLoader}
              />
              <Route
                path={TOURNAMENT_MEDIA}
                element={<TournamentMedia />}
                loader={torunamentMediaLoader}
                action={tournamentMediaAction}
              />
            </Route>
          </Route>

          <Route
            path={PLAYER_NOTIFICATIONS}
            element={<Notifications />}
            loader={notificationsLoader}
          />

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
            path={MEMBERSHIP}
            element={<EditMembership />}
            loader={editMembershipLoader}
            action={editMembershipAction}
          />

          <Route
            path={PURCHASE_MEMBERSHIP}
            element={<PurchaseMembership />}
            loader={editMembershipLoader}
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
