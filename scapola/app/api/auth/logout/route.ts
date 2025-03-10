// Em app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Versão corrigida para deletar o cookie "token"
    const cookieStore = await cookies();
    
    cookieStore.delete("token");
    
    return NextResponse.json({ 
      success: true,
      message: "Logout realizado com sucesso" 
    });

  } catch (error){
    console.error("Erro ao fazer logout:", error);
    return NextResponse.json({ 
      success: false,
      message: "Erro ao fazer logout" 
    }, { status: 500 });
  }
}