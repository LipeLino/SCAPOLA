import RelatedPost from "@/components/Blog/RelatedPost";
import SharePost from "@/components/Blog/SharePost";
import Image from "next/image";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params } : { params: Promise<{ id: string }>}) => {
  const { id } = await params;
  const post = await postId(id);

  if (!post) {
    return {
      title: 'Post não encontrado',
      description: 'Este post não está disponível',
    };
  }

  return {
    title: post.title
  };
};

const postId = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/posts/${id}`, { cache: "no-store" });
    
    if (!response.ok) return null;
    
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar o post:", error);
    return null;
  }
};
  
  const formatText = (text: string) => {
    return text.split("\n").map(paragraph => `<p>${paragraph}</p>`).join("");
  };

  const SingleBlogPage = async ({ params } : { params: Promise<{ id: string }>}) => {  
    const { id } = await params;
    const post = await postId(id);
  
    if (!post) {
      notFound();
    }
    
  return (
    <>
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
            <div className="lg:w-2/3">
              <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
                <div className="mb-10 w-full overflow-hidden ">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                    <Image
                      src={post.mainImage}
                      alt=""
                      fill
                      className="rounded-md object-cover object-center"
                    />
                  </div>
                </div>

                <h2 className="mb-5 mt-11 text-3xl font-semibold text-black dark:text-white 2xl:text-sectiontitle2">
                  {post.title}
                </h2>

                <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5">
                  <li>
                    <span className="text-black dark:text-white">Autor: </span>{" "}
                    {post.author}
                  </li>
                  <li>
                    <span className="text-black dark:text-white">
                      Publicado em: {post.publishedAt}
                    </span>{" "}
                  </li>
                  <li>
                    <span className="text-black dark:text-white">
                      Categoria:&nbsp;
                    </span>
                     {post.category}
                  </li>
                </ul>

                <div className="blog-details" dangerouslySetInnerHTML={{ __html: formatText(post.body) }}></div>

                  <div className="flex flex-wrap gap-5 object-cover">
                    <Image
                      src={post.mainImage}
                      width={350}
                      height={200}
                      alt="image"
                    />
                    {post.optionalImage && (
                      <Image
                      src={post.optionalImage}
                      width={350}
                      height={200}                      
                      alt="image"
                    />)}
                  </div>
                  {/* <hr className="my-8 h-0.5 bg-slate-100 dark:bg-white/10"/>
                  <SharePost/> */}
                </div>
              </div>
            <div className="md:w-1/2 lg:w-[32%]">
              {/* <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
                  Categorias
                </h4>

                <ul>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">Blog</a>
                  </li>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">Events</a>
                  </li>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">Grids</a>
                  </li>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">News</a>
                  </li>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">Rounded</a>
                  </li>
                </ul>
              </div> */}
              <RelatedPost />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};



export default SingleBlogPage;