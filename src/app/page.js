"use client";
import {
  Box,
  Center,
  createTheme,
  MantineProvider,
  SimpleGrid,
  Title,
  Tooltip,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import { useEffect, useState } from "react";
import functions from "./routes.js";
import { Card, Text } from "@mantine/core";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Pie,
} from "recharts";

export default function Home() {
  const [candlestickData, setCandlestickData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);

  // USE EFFECT (FETCH DATA FROM Django)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const candlestickData = await functions.getDataCandleStick();
        const lineChartData = await functions.getDataLineChart();
        const barChartData = await functions.getDataBarChart();
        const pieChartData = await functions.getDataPieChart();

        setCandlestickData(candlestickData?.data || []);
        setLineChartData(lineChartData?.data[0] || {});
        setBarChartData(barChartData?.data[0] || {});
        setPieChartData(pieChartData?.data[0] || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // ENSURE CANDLE STICK DATA FITS THE EXPECTED STRUCTURE
  const transformedCandlestickData =
    candlestickData?.map((item) => ({
      date: item.date,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    })) || [];

  // ENSURE LINE DATA FITS THE EXPECTED STRUCTURE
  const transformedDataLine =
    lineChartData?.labels && lineChartData?.data
      ? lineChartData.labels.map((label, index) => ({
          date: label,
          value: lineChartData.data[index],
        }))
      : [];

  // ENSURE BAR DATA FITS THE EXPECTED STRUCTURE
  const transformedDataBar =
    barChartData?.labels && barChartData?.data
      ? barChartData.labels.map((label, index) => ({
          date: label,
          value: barChartData.data[index],
        }))
      : [];

  // ENSURE PIE DATA FITS THE EXPECTED STRUCTURE
  const transformedDataPie =
    pieChartData?.labels && pieChartData?.data
      ? pieChartData.labels.map((label, index) => ({
          name: label,
          value: pieChartData.data[index],
          fill: label,
        }))
      : [];

  return (
    <MantineProvider>
      {/* BASIC TITLE */}
      <Center>
        <Title order={1} mb={"md"}>
          BlockHouse Dashboard
        </Title>
      </Center>
      {/* GRID */}
      <SimpleGrid
        cols={{ base: 1, "300px": 1, "1000px": 2 }}
        spacing={{ base: 10, "300px": "xs" }}
        type="container"
      >
        {/* LINE CHART */}
        <Card>
          <Center>
            <Box p={"md"} bg="var(--mantine-color-blue-light)">
              Line Chart
            </Box>
          </Center>
          {transformedDataLine.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={transformedDataLine}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <Text>No data available</Text>
          )}
        </Card>
        {/* BAR CHART */}
        <Card>
          <Center>
            <Box p={"md"} bg="var(--mantine-color-blue-light)">
              Bar Chart
            </Box>
          </Center>
          {transformedDataBar.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={transformedDataBar}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <Text>No data available</Text>
          )}
        </Card>
        {/* PIE CHART */}
        <Card>
          <Center>
            <Box p={"md"} bg="var(--mantine-color-blue-light)">
              Pie Chart
            </Box>
          </Center>
          {transformedDataPie.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                  data={transformedDataPie}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  fill={(entry) => entry.fill}
                  label
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <Text>No data available</Text>
          )}
        </Card>
        {/* CANDLESTICK CHART */}
        <Card>
          <Center>
            <Box p={"md"} bg="var(--mantine-color-blue-light)">
              Candlestick Chart
            </Box>
          </Center>
          {transformedCandlestickData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={transformedCandlestickData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="open"
                  fill="#FF0000"
                  radius={[5, 5, 0, 0]}
                  barSize={5}
                />
                <Bar
                  dataKey="close"
                  fill="#00FF00"
                  radius={[0, 0, 5, 5]}
                  barSize={5}
                />
                <Bar dataKey="high" fill="#8884d8" barSize={1} stackId="a" />
                <Bar dataKey="low" fill="#8884d8" barSize={1} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <Text>No data available</Text>
          )}
        </Card>
      </SimpleGrid>
    </MantineProvider>
  );
}
