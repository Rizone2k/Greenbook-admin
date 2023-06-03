import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  ArrowRightOnRectangleIcon,
  BookOpenIcon,
  TicketIcon,
  ListBulletIcon,
  PencilIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/solid";
import {
  Home,
  Orders,
  Authors,
  Books,
  Genres,
  Coupons,
  Users,
} from "@/pages/dashboard";
import { SignIn } from "@/pages/auth";
import Publishers from "@/pages/dashboard/publishers";

const icon = {
  className: "w-5 h-5 text-inherit",
};

const rolePublisher = ["admin", "superadmin", "publisher"];
const roleAdmin = ["admin", "superadmin"];

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
        roles: roleAdmin,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "books",
        path: "/books",
        element: <Books />,
        roles: rolePublisher,
      },
      {
        icon: <TicketIcon {...icon} />,
        name: "coupons",
        path: "/coupons",
        element: <Coupons />,
        roles: roleAdmin,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "orders",
        path: "/orders",
        element: <Orders />,
        roles: roleAdmin,
      },
      {
        icon: <PencilIcon {...icon} />,
        name: "authors",
        path: "/authors",
        element: <Authors />,
        roles: roleAdmin,
      },
      {
        icon: <BuildingOfficeIcon {...icon} />,
        name: "publishers",
        path: "/publishers",
        element: <Publishers />,
        roles: roleAdmin,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "users",
        path: "/users",
        element: <Users />,
        roles: roleAdmin,
      },
      {
        icon: <ListBulletIcon {...icon} />,
        name: "genres",
        path: "/genres",
        element: <Genres />,
        roles: roleAdmin,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "log out",
        path: "/sign-in",
        element: <SignIn />,
        roles: roleAdmin,
      },
    ],
  },
];

export default routes;
