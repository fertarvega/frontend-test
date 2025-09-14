"use client";

import { BarChart } from "@mui/x-charts/BarChart";
import { Suspense, useEffect, useState } from "react";
import { useUsers } from "@/context/UsersContext";
import Message from "./Message";
import Spinner from "./Spinner";

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
  const { users, flow } = useUsers();
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
      {chartData && chartData.length > 0 && (
        <BarChart
          dataset={chartData}
          xAxis={[{ dataKey: dataKeyName, tickPlacement, tickLabelPlacement }]}
          {...chartSetting}
        />
      )}
      {flow === "error" && (
        <Message type={"danger"}>
          No se pudo cargar la información de la tabla
        </Message>
      )}
      {flow === "loading" && <Spinner />}
    </Suspense>
  );
}
