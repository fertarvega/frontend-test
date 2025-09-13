import { NextResponse } from "next/server";
import { ICompany } from "@/interfaces/types";
import { API_URL } from "@/helpers/consts";

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/companies/`);
    const companies: ICompany[] = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Error al obtener las compañias del servidor externo" },
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
