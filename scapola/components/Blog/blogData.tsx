import { Blog } from "@/types/blog";

async function pegaPost(): Promise<Blog[]> {
  try {
    const response = await fetch("http://localhost:3000/api/get-posts");
    if (!response.ok) {
      throw new Error ("Erro com os posts.")
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

const BlogData = await pegaPost();

/*const BlogData: Blog[] = [
  {
    _id: 2,
    mainImage: "/images/blog/blog-05.png",
    title: "Cliente Scapola Comunica é destaque na maior emissora de Minas Gerais!",
    metadata:
      "Dr. Matheus Nister é urooncologista e foi destaque como fonte médica no site da Grupo Itatiaia, editoria de Saúde, falando sobre um importante tema: como as cirurgias robóticas auxiliam no tratamento de doenças da próstata,",
  },
  {
    _id: 2,
    mainImage: "/images/blog/blog-06.png",
    title: "GOLAÇO! Nosso parceiro Rede Unishop, da Start Química, estampando uma das melhores, senão a melhor, página/coluna jornalística de negócios e do mundo empresarial mineiro.",
    metadata:
      "Agradecemos sempre pelo prestígio da super Helenice Laguardia, que assina a Minas S/A, em O Tempo, a maior audiência do estado em grande imprensa.",
  },
];

*/
export default BlogData;
