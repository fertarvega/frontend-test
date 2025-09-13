import { NextResponse } from "next/server";
import { API_URL } from "@/helpers/consts";
import { IChartCompanyData } from "@/interfaces/types";

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/charts/users-by-company`);
    const companies: IChartCompanyData[] = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            "Error al obtener el contador de usuarios por compañia del servidor",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(companies, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las compañias" },
      { status: 500 }
    );
  }
}