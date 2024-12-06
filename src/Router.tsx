import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/authentication/page.login";
import LoginLayout from "./components/layouts/authentication/layout.login";
import BackendLayout from "./components/layouts/backend/layout.backend";
import ProtectedRoute from "./components/protect/ProtectRoute";

import FormRequestPage1 from "./pages/backend/formRequest/page.formRequestPage1";
import FormRequestPage2 from "./pages/backend/formRequest/page.formRequestPage2";
import TestUI from "./components/TestUI";
import Pagenotfound from "./pages/page.notfound";

function Router() {
  const BASE_PATH = "";
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LoginLayout />}>
            <Route path={BASE_PATH + "/login"} element={<LoginPage />} />
            <Route path={BASE_PATH + "/"} element={<LoginPage />} />
          </Route>

          <Route element={<BackendLayout />}>
            <Route
              path={BASE_PATH + "/request-form-1"}
              element={<FormRequestPage1 />}
            />
            <Route
              path={BASE_PATH + "/request-form-2"}
              element={<FormRequestPage2 />}
            />
          </Route>

          <Route path={BASE_PATH + "/ui"} element={<TestUI />} />
             {/* 404 Page Not found */}
        <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
