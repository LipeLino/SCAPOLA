import nodemailer from "nodemailer";

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({message: "Erro ao enviar."})
    }

    const {name, email, subject, tel, message} = req.body;

    if (!name || !email || !subject || !tel || !message) {
        return res.status(400).json({message: "Todos os campos são de preenchimento obrigatório."})
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

    try {
        // Código que pode gerar erro
        await transporter.sendMail(mailOptions);
      
        return res.status(200).json({ message: "E-mail enviado com sucesso!" });
      } catch (error) {
        // Captura e trata erros
        console.error(error);
        return res.status(500).json({ message: "Erro ao enviar o e-mail." });
      }
    }      