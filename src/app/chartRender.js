const candlestickChartData = {
  labels: candlestickData?.data.map((d) => d.x),
  datasets: [
    {
      label: "Candlestick",
      data: candlestickData?.data.map((d) => ({
        x: d.x,
        o: d.open,
        h: d.high,
        l: d.low,
        c: d.close,
      })),
      type: "candlestick",
    },
  ],
};

const lineChartConfig = {
  labels: lineChartData?.labels,
  datasets: [
    {
      label: "Line Chart",
      data: lineChartData?.data,
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
    },
  ],
};

const barChartConfig = {
  labels: barChartData?.labels,
  datasets: [
    {
      label: "Bar Chart",
      data: barChartData?.data,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const pieChartConfig = {
  labels: pieChartData?.labels,
  datasets: [
    {
      label: "Pie Chart",
      data: pieChartData?.data,
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

export default {
  candlestickChartData,
  lineChartConfig,
  barChartConfig,
  pieChartConfig,
};
