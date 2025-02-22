import multer from "multer";
import { Client } from "basic-ftp";
import path from "path";
import fs from 'fs';

export const config = {
    api: {
      bodyParser: false, // Desativa o bodyParser padrão do Next.js para aceitar `FormData`
    },
  };

const upload = multer({dest: './public/images/blog'});

export default async function handler(req, res) {
    if (req.method === "POST") {
        upload.single("imagem")(req, res, async (err) => {
            if (err) {
                console.log("Erro no multer:", err.message);
                return res.status(500).json({message: "Erro no upload.", error: err.message});
            }

            console.log("Arquivo recebido:", req.file);

            const client = new Client();
            try {
                await client.access({
                    host: '185.173.111.234',
                    user: 'u348493890.scapolacomunica.com',
                    password: 'aN25%,jWnn1'
                });

                const ext = path.extname(req.file.originalname);
                const finalFilename = `${req.file.filename}${ext}`;                
                const imgPathTemp = path.join(process.cwd(), './public/images/blog', req.file.filename);
                const hostPath = `/public_html/cdn/blog_imgs/${finalFilename}`;
                
                await client.uploadFrom(imgPathTemp, hostPath);
                
                const urlFinal = `https://cdn.scapolacomunica.com/blog_imgs/${finalFilename}`;
                
                fs.unlink(imgPathTemp, (err) => {
                    if (err) {
                        console.error("Erro ao deletar arquivo temporário:", err);
                    } else {
                        console.log("Arquivo temporário deletado:", imgPathTemp);
                    }
                });
                
                console.log(urlFinal);
                return res.status(200).json({urlFinal});
            } catch (error) {
                return res.status(500).json({message: "Erro no upload (FTP).", error: err.message})
            } finally {
                client.close();
            }
        });
    } else {
        return res.status(405).json({ message: "Método não permitido" });
    }
}