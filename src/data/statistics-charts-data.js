import greenBookAPI from "@/api/greenBookAPI";
import { chartsConfig } from "@/configs";
import { dashboardSelector } from "@/redux/selectors";
import { useSelector } from "react-redux";
const fetchData = async () => {
  try {
    const res = await greenBookAPI.getDashboard();
    if (res.status === 200) {
      const result = res.data;
      return result.data;
    }
  } catch (error) {
    throw error;
  }
  console.log("res", res);
  return res.data.data;
};

const view = () => {
  let dataPerDay;

  const getDataPerDay = async (callback) => {
    try {
      const result = await fetchData();
      dataPerDay = result;
      callback(dataPerDay);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDataPerDay = (data) => {
    console.log("dataPerDay.lsalary", data?.lsalary);
    // Xử lý giá trị mới của dataPerDay ở đây
  };

  getDataPerDay(handleDataPerDay);
  const websiteViewsChart = {
    type: "bar",
    height: 220,
    series: [
      {
        name: "Views",
        data: [dataPerDay?.lsalary ?? 20, 20, 10, 22, 50, 10, 40],
      },
    ],
    options: {
      ...chartsConfig,
      colors: "#fff",
      plotOptions: {
        bar: {
          columnWidth: "16%",
          borderRadius: 5,
        },
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: ["M", "T", "W", "T", "F", "S", "S"],
      },
    },
  };

  return websiteViewsChart;
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#fff"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
  },
};

const completedTasksChart = {
  ...dailySalesChart,
  series: [
    {
      name: "Tasks",
      data: [50, 40, 300, 220, 500, 250, 400],
    },
  ],
};

const dataView = view();
export const statisticsChartsData = [
  {
    color: "blue",
    title: "Lượt truy cập",
    description: "Người dùng tiềm năng",
    footer: "Cập nhật 10 phút trước",
    chart: dataView,
  },
  {
    color: "green",
    title: "Lượng đầu sách",
    description: "Tăng 15% vào tuần này",
    footer: "Vừa cập nhật",
    chart: completedTasksChart,
  },
];

export default statisticsChartsData;
