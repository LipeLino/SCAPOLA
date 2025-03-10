import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const {name, email, subject, tel, message} = body;

    if (!name || !email || !subject || !tel || !message) {
      return NextResponse.json({ message: "Todos os campos são obrigatórios." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: `${process.env.EMAIL_TO_PRIMARY}, ${process.env.EMAIL_TO_SECONDARY}`,
        subject: `${subject}`,
        text: `
        Nome: ${name}
        E-mail: ${email}
        Telefone: ${tel}
        
        Mensagem:
        ${message}
      `,
    };
        await transporter.sendMail(mailOptions);
      
        return NextResponse.json({ message: "E-mail enviado com sucesso!" }, { status: 200 });
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        return NextResponse.json({ message: "Erro ao enviar o e-mail." }, { status: 500 });
    }
}