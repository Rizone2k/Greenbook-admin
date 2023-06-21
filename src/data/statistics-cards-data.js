import {
  UserIcon,
  PencilIcon,
  BookOpenIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { dashboardSelector } from "@/redux/selectors";
import { useSelector } from "react-redux";


export const statisticsCardsData = ()=>{
  const dashboardData = useSelector(dashboardSelector);
  return([
    {
      color: "blue",
      icon: CurrencyDollarIcon,
      title: "Doanh thu sách",
      value:`${(dashboardData?.lsalary)?.toLocaleString()}đ`,
      footer: {
        color: "text-green-500",
        value: "+25%",
        label: "so với tuần trước",
      },
    },
    {
      color: "pink",
      icon: UserIcon,
      title: "Người dùng",
      value: `${dashboardData?.nuser}`,
      footer: {
        color: "text-green-500",
        value: "+3%",
        label: "so với tháng trước",
      },
    },
    {
      color: "green",
      icon: BookOpenIcon ,
      title: "Số đầu sách",
      value: `${dashboardData?.nbooks}`,
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
      value: `${dashboardData?.nauthor}`,
      footer: {
        color: "text-green-500",
        value: "+1%",
        label: "so với tuần trước",
      },
    },
  ])
}


export default statisticsCardsData;
