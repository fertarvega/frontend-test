"use client";

import { BarChart } from "@mui/x-charts/BarChart";
import { Suspense, useEffect, useState } from "react";
import { useUsers } from "@/context/UsersContext";

interface IBarChartComponentProps {
  yLabel: string;
  seriesLabel: string;
  color: string;
  datasetUrl: string;
  dataKeyName: string;
}

export function BarChartComponent({
  yLabel,
  seriesLabel,
  color,
  datasetUrl,
  dataKeyName,
}: IBarChartComponentProps) {
  const { users } = useUsers();
  const [chartData, setChartData] = useState([]);

  const chartSetting = {
    yAxis: [
      {
        label: yLabel,
        width: 60,
      },
    ],
    series: [{ dataKey: "count", label: seriesLabel }],
    height: 300,
    margin: { left: 0 },
    colors: [color],
  };

  const tickPlacement = "start";
  const tickLabelPlacement = "middle";

  const getChartData = async () => {
    try {
      const res = await fetch(datasetUrl);
      const data = await res.json();
      setChartData(data);
    } catch (error) {
      console.error("Error al obtener los usuarios por país", error);
    }
  };

  useEffect(() => {
    getChartData();
  }, [users]);

  return (
    <Suspense>
      <BarChart
        dataset={chartData}
        xAxis={[{ dataKey: dataKeyName, tickPlacement, tickLabelPlacement }]}
        {...chartSetting}
      />
    </Suspense>
  );
}
