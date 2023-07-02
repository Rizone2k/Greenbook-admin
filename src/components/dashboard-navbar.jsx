import { useLocation, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import { useSelector } from "react-redux";
import { currentUserSelector } from "@/redux/selectors";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const currentUser = useSelector(currentUserSelector);
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  return (
    <Navbar
      color={fixedNavbar ? "white" : "white"}
      className={`rounded-xl text-white transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 bg-opacity-100 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="relative capitalize">
          <div className=" relative flex items-center rounded-lg bg-transparent py-2 px-4"></div>
        </div>
        <div className="flex items-center">
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-white" />
          </IconButton>

          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            {/* fixedNavbar */}
            <Cog6ToothIcon
              className={`h-5 w-5 font-bold ${
                fixedNavbar ? "text-[#3e444a]" : "text-white"
              }`}
            />
          </IconButton>
          <Tippy
            className="capitalize"
            content={currentUser.firstName + " " + currentUser.lastName}
          >
            <Avatar
              size="sm"
              className="cursor-pointer"
              onClick={() => alert("Coming soon!")}
              src={
                currentUser?.avatar != "string"
                  ? currentUser?.avatar
                  : "/img/defaultAdmin.png"
              }
              alt="avatar"
              variant="circular"
            />
          </Tippy>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
