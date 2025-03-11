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

        const arrayBuffer = await imagem.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const ext = path.extname(imagem.name);
        const finalFilename = `${Date.now()}${ext}`;
        const imgPathTemp = path.join(process.cwd(), "public", "images", "brand", finalFilename);

        await fs.writeFile(imgPathTemp, buffer);

        const client = new Client();
        await client.access({
            host: process.env.DB_HOST_2,
            user: process.env.DB_USER_2,
            password: process.env.DB_PASSWORD_2,
        });

        const hostPath = `/public_html/cdn/brands/${finalFilename}`;
        await client.uploadFrom(imgPathTemp, hostPath);
        client.close();

        await fs.unlink(imgPathTemp);

        const urlFinal = `https://cdn.scapolacomunica.com/brands/${finalFilename}`;
        return NextResponse.json({ urlFinal }, { status: 200 });
    } catch (error) {
        console.error("Erro no upload:", error);
        return NextResponse.json({ message: "Erro no upload.", error: error.message }, { status: 500 });
    }
}
