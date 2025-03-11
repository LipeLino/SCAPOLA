import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // Alternativa ao jwt para o ambiente Edge

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const secretKey = process.env.SECRET_KEY;

  console.log("Middleware executado na rota:", req.nextUrl.pathname);
  
  if (!token) {
    console.log("Middleware: Token não encontrado");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (!secretKey) {
    console.log("Middleware: SECRET_KEY não encontrada");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const encoder = new TextEncoder();
    await jwtVerify(token, encoder.encode(secretKey));
    
    console.log("Middleware: Token verificado com sucesso");
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware: Erro na verificação do token:", error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};