import React from "react";
import "@/styles/global.scss";
import { CreateUser } from "@/components/CreateUser";
import TableUsers from "@/components/TableUsers";
import { UsersProvider } from "@/context/UsersContext";
import { BarChartComponent } from "@/components/BarChartComponent";
import Header from "@/components/Header";

export default function Page() {
  return (
    <>
      <Header />
      <UsersProvider>
        <section className="section-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>Listado de usuarios</h1>
            <CreateUser />
          </div>
          <TableUsers />
        </section>
        <section style={{ marginTop: "16px" }} className="section-container">
          <h2>Gráficas</h2>
          <div className="section-charts">
            <BarChartComponent
              yLabel={"Numero de usuarios"}
              seriesLabel={"Usuarios"}
              color={"#f5ab42"}
              datasetUrl={"/api/charts/company"}
              dataKeyName={"company"}
            />
            <BarChartComponent
              yLabel={"Numero de usuarios"}
              seriesLabel={"Usuarios"}
              color={"#d0d530"}
              datasetUrl={"/api/charts/country"}
              dataKeyName={"country"}
            />
          </div>
        </section>
      </UsersProvider>
    </>
  );
}
