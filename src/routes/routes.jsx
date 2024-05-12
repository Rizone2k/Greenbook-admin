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
  TruckIcon,
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
import Shippings from "@/pages/dashboard/shippings";
import { useSelector } from "react-redux";
import { currentUserSelector } from "@/redux/selectors";
import store from "@/redux/store";

const icon = {
  className: "w-5 h-5 text-inherit",
};

const roleAdmin = ["admin", "superadmin"];

let routes;

const routesDistribute = () => {
  routes = null;
  const currentState = store.getState();
  const currentUser = currentUserSelector(currentState);

  if (currentUser?.roles?.some((item) => roleAdmin.includes(item))) {
    return [
      {
        layout: "dashboard",
        pages: [
          {
            icon: <HomeIcon {...icon} />,
            name: "Thống kê",
            path: "/home",
            element: <Home />,
          },
          {
            icon: <BookOpenIcon {...icon} />,
            name: "Sách",
            path: "/books",
            element: <Books />,
          },
          {
            icon: <ListBulletIcon {...icon} />,
            name: "Thể loại",
            path: "/genres",
            element: <Genres />,
          },
          {
            icon: <PencilIcon {...icon} />,
            name: "Tác giả",
            path: "/authors",
            element: <Authors />,
          },

          {
            icon: <TableCellsIcon {...icon} />,
            name: "Đơn hàng",
            path: "/orders",
            element: <Orders />,
          },
          {
            icon: <TicketIcon {...icon} />,
            name: "Mã giảm giá",
            path: "/coupons",
            element: <Coupons />,
          },
          {
            icon: <TruckIcon {...icon} />,
            name: "Vận chuyển",
            path: "/shippings",
            element: <Shippings />,
          },
          {
            icon: <BuildingOfficeIcon {...icon} />,
            name: "Nhà xuất bản",
            path: "/publishers",
            element: <Publishers />,
          },
          {
            icon: <UserCircleIcon {...icon} />,
            name: "Người dùng",
            path: "/users",
            element: <Users />,
          },
        ],
      },
      {
        title: "auth pages",
        layout: "auth",
        pages: [
          {
            icon: <ArrowRightOnRectangleIcon {...icon} />,
            name: "Đăng xuất",
            path: "/sign-in",
            element: <SignIn />,
          },
        ],
      },
    ];
  } else {
    return [
      {
        layout: "dashboard",
        pages: [
          {
            icon: <HomeIcon {...icon} />,
            name: "Thống kê",
            path: "/home",
            element: <Home />,
          },
          {
            icon: <BookOpenIcon {...icon} />,
            name: "Sách",
            path: "/books",
            element: <Books />,
          },
          {
            icon: <PencilIcon {...icon} />,
            name: "Tác giả",
            path: "/authors",
            element: <Authors />,
          },
          {
            icon: <TableCellsIcon {...icon} />,
            name: "Đơn hàng",
            path: "/orders",
            element: <Orders />,
          },
          {
            icon: <TicketIcon {...icon} />,
            name: "Mã giảm giá",
            path: "/coupons",
            element: <Coupons />,
          },
        ],
      },
      {
        title: "auth pages",
        layout: "auth",
        pages: [
          {
            icon: <ArrowRightOnRectangleIcon {...icon} />,
            name: "Đăng xuất",
            path: "/sign-in",
            element: <SignIn />,
          },
        ],
      },
    ];
  }
};

export const assignRoutes = () => {
  routes = routesDistribute();
  return routes;
};

assignRoutes();

export default routes;
