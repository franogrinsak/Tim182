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
  COURTS,
  DASHBOARD,
  HOME,
  LOGGED,
  REGISTER,
} from "./util/paths";
import LandingPageLayout from "./components/pageLayout/LandingPageLayout";
import Courts from "./components/courts/Courts";
import CourtDetail from "./components/courts/CourtDetails";
import CourtsLayout from "./components/courts/CourtsLayout";
import AddCourt from "./components/courts/AddCourt";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path={HOME} element={<LandingPageLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={<NotFound path={HOME} returnText={"homepage"} />}
          />
        </Route>
        <Route path={APP} loader={async () => requireAuth()} element={<Main />}>
          <Route index element={<Dashboard />} />
          <Route path={LOGGED} element={<Logged />} />
          <Route
            path={REGISTER}
            element={<Register />}
            action={registerAction}
          />
          <Route path={COURTS} element={<CourtsLayout />}>
            <Route index element={<Courts />} />
            <Route path={COURT_DETAIL} element={<CourtDetail />} />
            <Route
              path={ADD_COURT}
              element={<AddCourt />}
              action={addCourtAction}
            />
          </Route>
          <Route
            path="*"
            element={<NotFound path={APP} returnText={"dashboard"} />}
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
