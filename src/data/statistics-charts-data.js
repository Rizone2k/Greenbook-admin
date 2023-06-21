import { chartsConfig } from "@/configs";
const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Views",
      data: [50, 20, 10, 22, 50, 10, 40],
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

export const statisticsChartsData = [
  {
    color: "blue",
    title: "Lượt truy cập",
    description: "Người dùng tiềm năng",
    footer: "Cập nhật 10 phút trước",
    chart: websiteViewsChart,
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
