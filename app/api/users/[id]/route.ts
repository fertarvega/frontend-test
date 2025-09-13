import { API_URL } from "@/helpers/consts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${API_URL}/users/${params.id}`);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: response.status }
      );
    }
    const user = await response.json();
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener usuario" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const response = await fetch(`${API_URL}/users/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return NextResponse.json(
        { error: "Error al actualizar usuario" },
        { status: response.status }
      );
    }
    const updatedUser = await response.json();
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar usuario" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${API_URL}/users/${params.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      return NextResponse.json(
        { error: "Error al eliminar usuario" },
        { status: response.status }
      );
    }
    return NextResponse.json({ message: "Usuario eliminado" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar usuario" },
      { status: 500 }
    );
  }
}
