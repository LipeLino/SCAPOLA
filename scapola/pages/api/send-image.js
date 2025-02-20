import multer from "multer";
import basicFTP from "basic-ftp";
import path from "path";

const upload = multer({dest: './public/images/blog'});

export default async function handler(req, res) {
    console.log("Arquivo recebido:", req.file);
    if (req.method === "POST") {
        upload.single("imagem")(req, res, async (err) => {
            if (err) {                console.log("Erro no multer:", err.message);  // Log de erro do multer
                return res.status(500).json({message: "Erro no upload.", error: err.message});
            }

            const client = new basicFTP.Client();
            try {
                await client.access({
                    host: 'ftp://185.173.111.234',
                    user: 'u348493890.scapolacomunica.com',
                    password: 'aN25%,jWnn1'
                });

                const imgPathTemp = path.join(process.cwd(), 'temp-upload', req.file.filename);
                const hostPath = `/public_html/images/${req.file.filename}`;
                console.log(process.cwd())

                await client.uploadFrom(imgPathTemp, hostPath);

                const urlFinal = `https://www.scapolacomunica.com/images/${req.file.filename}`;

                return res.status(200).json({urlFinal})
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