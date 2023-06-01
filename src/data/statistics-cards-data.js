import {
  UserPlusIcon,
  UserIcon,
  PencilIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "blue",
    icon: BookOpenIcon,
    title: "Doanh thu sách",
    value: "$53k",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "so với tuần trước",
    },
  },
  {
    color: "pink",
    icon: UserIcon,
    title: "Người dùng",
    value: "230",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "so với tháng trước",
    },
  },
  {
    color: "green",
    icon: UserPlusIcon,
    title: "Người dùng mới",
    value: "31",
    footer: {
      color: "text-green-500",
      value: "+2%",
      label: "so với tuần trước",
    },
  },
  {
    color: "orange",
    icon: PencilIcon,
    title: "Tác giả",
    value: "30",
    footer: {
      color: "text-green-500",
      value: "+1%",
      label: "so với tuần trước",
    },
  },
];

export default statisticsCardsData;
