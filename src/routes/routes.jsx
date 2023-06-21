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
        name: "Thống kê",
        path: "/home",
        element: <Home />,
        roles: roleAdmin,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "Sách",
        path: "/books",
        element: <Books />,
        roles: rolePublisher,
      },
      {
        icon: <TicketIcon {...icon} />,
        name: "Mã giảm giá",
        path: "/coupons",
        element: <Coupons />,
        roles: roleAdmin,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Đơn hàng",
        path: "/orders",
        element: <Orders />,
        roles: roleAdmin,
      },
      {
        icon: <PencilIcon {...icon} />,
        name: "Tác giả",
        path: "/authors",
        element: <Authors />,
        roles: roleAdmin,
      },
      {
        icon: <BuildingOfficeIcon {...icon} />,
        name: "Nhà xuất bản",
        path: "/publishers",
        element: <Publishers />,
        roles: roleAdmin,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Người dùng",
        path: "/users",
        element: <Users />,
        roles: roleAdmin,
      },
      {
        icon: <ListBulletIcon {...icon} />,
        name: "Thể loại",
        path: "/genres",
        element: <Genres />,
        roles: roleAdmin,
      },
      {
        icon: <TruckIcon {...icon} />,
        name: "Vận chuyển",
        path: "/shippings",
        element: <Shippings />,
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
        name: "Đăng xuất",
        path: "/sign-in",
        element: <SignIn />,
        roles: roleAdmin,
      },
    ],
  },
];

export default routes;
