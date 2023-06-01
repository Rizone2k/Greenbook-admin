import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  ArrowRightOnRectangleIcon,
  BookOpenIcon,
  TicketIcon,
  ListBulletIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import {
  Home,
  Orders,
  Authors,
  Books,
  Genres,
  Coupon,
  Users,
} from "@/pages/dashboard";
import { SignIn } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "books",
        path: "/books",
        element: <Books />,
      },
      {
        icon: <TicketIcon {...icon} />,
        name: "coupon",
        path: "/coupon",
        element: <Coupon />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "orders",
        path: "/orders",
        element: <Orders />,
      },
      {
        icon: <PencilIcon {...icon} />,
        name: "authors",
        path: "/authors",
        element: <Authors />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "users",
        path: "/users",
        element: <Users />,
      },
      {
        icon: <ListBulletIcon {...icon} />,
        name: "genres",
        path: "/genres",
        element: <Genres />,
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
        path: "/log-out",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
