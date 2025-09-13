import { NextRequest, NextResponse } from "next/server";
import { IUser } from "@/interfaces/types";
import { API_URL } from "@/helpers/consts";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const email = searchParams.get("email");
    const name = searchParams.get("name");
    const company = searchParams.get("company");

    let url = `${API_URL}/users/`;
    const params = new URLSearchParams();

    const page = searchParams.get("page");
    const rows = searchParams.get("rows");

    if (page) params.append("page", page);
    if (rows) params.append("rows", rows);
    if (email) params.append("email", email);
    if (name) params.append("name", name);
    if (company) params.append("company", company);

    if ([...params].length > 0) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url);
    const users: IUser[] = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Error al obtener usuarios del servidor externo" },
        { status: response.status }
      );
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const requiredFields = [
      "email",
      "name",
      "country",
      "age",
      "gender",
      "phone",
      "companyId",
    ];
    const missing = requiredFields.filter((field) => !data[field]);

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Faltan campos requeridos: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_URL}/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Error al crear usuario en el servidor externo" },
        { status: response.status }
      );
    }

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear usuario" },
      { status: 500 }
    );
  }
}
