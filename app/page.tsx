import React from "react";
import styles from "@/styles/index.module.scss";
import { CreateUser } from "@/components/CreateUser";
import TableUsers from "@/components/TableUsers";
import { UsersProvider } from "@/context/UsersContext";
import { BarChartComponent } from "@/components/BarChartComponent";

export default function Page() {
  return (
    <UsersProvider>
      <section>
        <CreateUser />
        <h1 className={styles.testscss}>Listado de usuarios</h1>
        <TableUsers />
        <BarChartComponent
          yLabel={"Numero de usuarios"}
          seriesLabel={"Usuarios"}
          color={"red"}
          datasetUrl={"/api/charts/company"}
          dataKeyName={"company"}
        />
        <BarChartComponent
          yLabel={"Numero de usuarios"}
          seriesLabel={"Usuarios"}
          color={"blue"}
          datasetUrl={"/api/charts/country"}
          dataKeyName={"country"}
        />
      </section>
    </UsersProvider>
  );
}
