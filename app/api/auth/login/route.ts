import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;
  const secKey = process.env.SECRET_KEY;

  if (!adminUser || !adminPass || !secKey) {
    console.log("Erro: Variáveis de ambiente não configuradas corretamente");
    return NextResponse.json({ error: "Configuração inválida" }, { status: 500 });
  }

  if (username !== adminUser || password !== adminPass) {
    console.log("Erro: Credenciais inválidas");
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  const token = jwt.sign({ username }, secKey, { expiresIn: "2h" });

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 12, // 12 horas
    path: "/",
  });

  const secretKey = process.env.SECRET_KEY;
  console.log("Backend: SECRET_KEY usada ->", secretKey);
  console.log("Enviando cookie:", token);

  return NextResponse.json({ message: "Login bem-sucedido" });
}
