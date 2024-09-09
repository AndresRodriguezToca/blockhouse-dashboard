/**
 * Candlestick Chart
 */
async function getDataCandleStick() {
  const res = await fetch("http://127.0.0.1:8000/api/candlestick-data/");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

/**
 * Line Chart
 */
async function getDataLineChart() {
  const res = await fetch("http://127.0.0.1:8000/api/line-chart-data/");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

/**
 * Bar Chart
 */
async function getDataBarChart() {
  const res = await fetch("http://127.0.0.1:8000/api/bar-chart-data/");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

/**
 * Pie Chart
 */
async function getDataPieChart() {
  const res = await fetch("http://127.0.0.1:8000/api/pie-chart-data/");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default {
  getDataCandleStick,
  getDataLineChart,
  getDataBarChart,
  getDataPieChart,
};
