import { Blog } from "@/types/blog";

async function pegaPost(): Promise<Blog[]> {
  try {
    const response = await fetch("http://localhost:3000/api/posts");
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
export default BlogData;

// export async function getStaticProps() {
//   const posts = await pegaPost(); // Busca os posts da API

//   return {
//     props: {
//       posts, // Passa os posts como props para a página
//     },
//     revalidate: 120, // Revalida a página a cada 60 segundos
//   };
// }