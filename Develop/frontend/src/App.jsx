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
import NotFound from "./components/pageLayout/NotFound";
import Register from "./components/Register";
import { action as registerAction } from "./components/Register";
import { action as addCourtAction } from "./components/courts/AddCourt";
import {
  ADD_USER,
  APP,
  COURT_DETAIL,
  COURT_OWNER_ADD,
  COURT_OWNER_PROFILE,
  COURTS,
  EDIT_COURT,
  EDIT_COURT_OWNER_PROFILE,
  EDIT_USER,
  HOME,
  LOGIN,
  MEMBERSHIP,
  ORGANIZE_TOURNAMENT,
  OWNER_COURTS,
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
import Users, {
  loader as usersLoader,
  action as deleteUserAction,
} from "./components/users/Users";
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
import ProtectedRoute from "./components/ProtectedRoute";
import { USER_ROLES } from "./util/constants";
import { requireAuth } from "./util/api/auth";
import ErrorPage from "./components/pageLayout/ErrorPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path={HOME} element={<LandingPageLayout />}>
          <Route index element={<LandingPage />} />
          <Route path={LOGIN} element={<Login />} />
          <Route
            path="*"
            element={<NotFound link={HOME} returnText={"homepage"} />}
          />
        </Route>

        <Route
          path={APP}
          loader={async () => requireAuth()}
          element={<Main />}
          errorElement={<ErrorPage />}
        >
          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Register page */}
          <Route
            element={<ProtectedRoute allowedRoles={[USER_ROLES.NEW_USER]} />}
          >
            <Route
              path={REGISTER}
              element={<Register />}
              action={registerAction}
            />
          </Route>

          {/* Courts UI */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={[USER_ROLES.OWNER, USER_ROLES.PLAYER]}
              />
            }
          >
            <Route path={COURTS}>
              <Route
                element={<ProtectedRoute allowedRoles={[USER_ROLES.PLAYER]} />}
              >
                <Route index element={<AllCourts />} loader={allCourtsLoader} />
              </Route>
              <Route path={OWNER_COURTS} element={<CourtsLayout />}>
                <Route index element={<Courts />} loader={ownerCourtsLoader} />
                <Route
                  path={COURT_OWNER_PROFILE}
                  element={<OwnerProfile />}
                  loader={ownerProfileLoader}
                />
                <Route
                  element={<ProtectedRoute allowedRoles={[USER_ROLES.OWNER]} />}
                >
                  <Route
                    path={COURT_OWNER_ADD}
                    element={<AddCourt />}
                    action={addCourtAction}
                  />
                </Route>
              </Route>
              <Route
                path={COURT_DETAIL}
                element={<CourtDetail />}
                loader={courtDetailLoader}
              />
              <Route
                element={<ProtectedRoute allowedRoles={[USER_ROLES.OWNER]} />}
              >
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
            </Route>
          </Route>

          {/* Tournaments UI */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={[USER_ROLES.OWNER, USER_ROLES.PLAYER]}
              />
            }
          >
            <Route path={TOURNAMENTS}>
              <Route
                element={<ProtectedRoute allowedRoles={[USER_ROLES.PLAYER]} />}
              >
                <Route
                  index
                  element={<Tournaments />}
                  loader={allTournamentsLoader}
                />
              </Route>

              <Route
                path={OWNER_TOURNAMENTS}
                element={<Tournaments />}
                loader={ownerTournamentsLoader}
              />
              <Route
                element={<ProtectedRoute allowedRoles={[USER_ROLES.OWNER]} />}
              >
                <Route
                  path={ORGANIZE_TOURNAMENT}
                  element={<OrganizeTournament />}
                  loader={organizeTournamentLoader}
                  action={organizeTournamentAction}
                />
              </Route>

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
                  element={<ProtectedRoute allowedRoles={[USER_ROLES.OWNER]} />}
                >
                  <Route
                    path={TOURNAMENT_PARTICIPATIONS}
                    element={<Participations />}
                    loader={participationsLoader}
                  />
                </Route>
                <Route
                  path={TOURNAMENT_MEDIA}
                  element={<TournamentMedia />}
                  loader={torunamentMediaLoader}
                  action={tournamentMediaAction}
                />
              </Route>
            </Route>
          </Route>

          {/* Notifications */}
          <Route
            element={<ProtectedRoute allowedRoles={[USER_ROLES.PLAYER]} />}
          >
            <Route
              path={PLAYER_NOTIFICATIONS}
              element={<Notifications />}
              loader={notificationsLoader}
            />
          </Route>

          {/* User management UI */}
          <Route element={<ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]} />}>
            <Route path={USERS}>
              <Route
                index
                element={<Users />}
                loader={usersLoader}
                action={deleteUserAction}
              />
              <Route
                path={ADD_USER}
                element={<AddUser />}
                action={addUserAction}
              />
              <Route
                path={EDIT_USER}
                element={<EditUser />}
                loader={editUserLoader}
                action={editUserAction}
              />
            </Route>
          </Route>

          {/* Membership mangement UI */}
          <Route element={<ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]} />}>
            <Route
              path={MEMBERSHIP}
              element={<EditMembership />}
              loader={editMembershipLoader}
              action={editMembershipAction}
            />
          </Route>

          {/* Buying membership */}
          <Route
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.UNPAID_OWNER]} />
            }
          >
            <Route
              path={PURCHASE_MEMBERSHIP}
              element={<PurchaseMembership />}
              loader={editMembershipLoader}
            />
          </Route>

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
