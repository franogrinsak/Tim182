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
import { requireAuth } from "./util/auth";
import { APP, DASHBOARD, HOME, LOGGED, REGISTER } from "./util/paths";
import LandingPageLayout from "./components/pageLayout/LandingPageLayout";

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
