import { Routes, Route, useNavigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { Sidenav, DashboardNavbar, Configurator, Footer } from "@/components";
import routes from "@/routes/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { useSelector } from "react-redux";
import { currentUserSelector, isLoggedInSelector } from "@/redux/selectors";
import { useEffect, useState } from "react";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const isLogged = useSelector(isLoggedInSelector);
  const currentUser = useSelector(currentUserSelector);
  const navigate = useNavigate();
  const [routesLayout, setRoutesLayout] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const allowRoles = ["admin", "superadmin"];

  useEffect(() => {
    isLogged == false && navigate("/auth/sign-in");
    setRoutesLayout(filterRoles(currentUser?.roles, routes));
    const checkIsAdmin = () => {
      for (let role of currentUser?.roles) {
        if (allowRoles.includes(role)) {
          setIsAdmin(true);
        }
      }
    };
    isLogged && checkIsAdmin();
  }, [isLogged]);

  function filterRoles(allowRoles, roles) {
    if (isLogged) {
      const pages = [];
      for (let role of roles) {
        if (role.pages) {
          for (let page of role.pages) {
            if (
              page?.roles &&
              page?.roles?.some((r) => allowRoles.includes(r))
            ) {
              pages.push(page);
            }
          }
        }
      }
      let final = [{ pages, layout: "dashboard" }];

      final = [...final, routes[1]];

      return final;
    }
  }
  return (
    isLogged && (
      <div className="min-h-screen bg-blue-gray-50/50">
        <div className="fixed min-h-[35vh] w-full  bg-blue-500"></div>
        <Sidenav
          routes={isAdmin ? routes : filterRoles(currentUser?.roles, routes)}
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
            {routesLayout.map(
              ({ layout, pages }) =>
                layout === "dashboard" &&
                pages.map(({ path, element }) => (
                  <Route exact path={path} element={element} />
                ))
            )}
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
