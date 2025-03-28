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
    console.log(post.img)
    
  return (
    <>
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
            <div className="lg:w-2/3">
              <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
                <div className="mb-10 w-full overflow-hidden ">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                  <a href={post.mainImage} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={post.mainImage}
                      alt=""
                      fill
                      className="rounded-md object-cover object-center"
                    /></a>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-lg">
                  <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4 dark:text-slate-200">{post.title}</h1>
                  <div className="flex flex-wrap justify-center gap-4">
                    <div className="flex items-center text-md text-gray-600 dark:text-white">
                      🖋️ <span className="ml-2">{post.author}</span>
                    </div>
                    <div className="flex items-center text-md text-gray-600 dark:text-white">
                      📅 <span className="ml-2">{post.publishedAt}</span>
                    </div>
                    <div className="flex items-center text-md text-gray-600 dark:text-white">
                      🏷️ <span className="bg-blue-500 rounded font-semibold text-sm px-1.5 text-white dark:text-white" style={{ backgroundColor: post.color }}>{post.category}</span>
                    </div>
                  </div>
                </div>

                <hr className="my-8 h-0.5 bg-slate-200 dark:bg-white/10"/>

                <div className="blog-details" dangerouslySetInnerHTML={{ __html: formatText(post.body) }}></div>

                <hr className="my-8 h-0.5 bg-slate-200 dark:bg-white/10"/>

                  <div className="flex flex-wrap gap-5 object-cover justify-center">
                    <a href={post.mainImage} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={post.mainImage}
                      width={350}
                      height={200}
                      alt="image"
                    />
                    </a>
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