import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { Sidenav, DashboardNavbar, Configurator, Footer } from "@/components";
import routes from "@/routes/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { useDispatch, useSelector } from "react-redux";
import { currentUserSelector, isLoggedInSelector } from "@/redux/selectors";
import { useEffect, useState } from "react";
import { getDashboard } from "@/redux/reducers/dashboard";
import { unwrapResult } from "@reduxjs/toolkit";
import { assignRoutes } from "@/routes/routes";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const isLogged = useSelector(isLoggedInSelector);
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();
  const [routesDashBoard, setRoutesDashBoard] = useState(routes);

  const getDashboardAdmin = () => {
    dispatchRedux(getDashboard({ day: "7" }))
      .then(unwrapResult)
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // routes
    setRoutesDashBoard(assignRoutes());

    isLogged && getDashboardAdmin();
  }, []);

  useEffect(() => {
    isLogged == false && navigate("/auth/sign-in");
  }, [isLogged]);

  return (
    isLogged && (
      <div className="min-h-screen bg-blue-gray-50/50">
        <div className="fixed min-h-[12vh] w-full bg-blue-500"></div>
        <Sidenav
          routes={routesDashBoard && routesDashBoard}
          brandImg={
            sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct.png"
          }
        />
        <div className="p-4 xl:ml-80">
          <DashboardNavbar />
          <Configurator />
          <IconButton
            size="lg"
            color="white"
            className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
            ripple={false}
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5" />
          </IconButton>
          <Routes>
            {routesDashBoard &&
              routesDashBoard.map(
                ({ layout, pages }) =>
                  layout === "dashboard" &&
                  pages.map(({ path, element }) => (
                    <Route exact path={path} element={element} />
                  ))
              )}
            <Route
              path="*"
              element={<Navigate to="/dashboard/home" replace />}
            />
          </Routes>
          <div className="text-blue-gray-600">
            <Footer />
          </div>
        </div>
      </div>
    )
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
