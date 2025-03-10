import { Client } from "basic-ftp";
import path from "path";
import fs from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const imagem = formData.get("imagem");

        if (!imagem) {
            return NextResponse.json({ message: "Nenhuma imagem enviada." }, { status: 400 });
        }

        // Lendo o conteúdo do arquivo para um Buffer
        const arrayBuffer = await imagem.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const ext = path.extname(imagem.name);
        const finalFilename = `${Date.now()}${ext}`;
        const imgPathTemp = path.join(process.cwd(), "public", "images", "brand", finalFilename);

        // Salvando localmente antes do upload
        await fs.writeFile(imgPathTemp, buffer);

        const client = new Client();
        await client.access({
            host: "185.173.111.234",
            user: "u348493890.scapolacomunica.com",
            password: "aN25%,jWnn1",
        });

        const hostPath = `/public_html/cdn/brands/${finalFilename}`;
        await client.uploadFrom(imgPathTemp, hostPath);
        client.close();

        // Exclui o arquivo temporário após o envio
        await fs.unlink(imgPathTemp);

        const urlFinal = `https://cdn.scapolacomunica.com/brands/${finalFilename}`;
        return NextResponse.json({ urlFinal }, { status: 200 });
    } catch (error) {
        console.error("Erro no upload:", error);
        return NextResponse.json({ message: "Erro no upload.", error: error.message }, { status: 500 });
    }
}
