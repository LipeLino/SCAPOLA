import BlogData from "@/components/Blog/blogData";
import BlogItem from "@/components/Blog/BlogItem";
import SectionHeader from "@/components/Common/SectionHeader";
import { Metadata } from "next";
//import { usePathname } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Blog - Scapola Comunica",
//   description: "This is Blog page for Solid Pro",
//   // other metadata
// };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog - Scapola Comunica",
    description: "This is Blog page for Solid Pro",
  };
}

const BlogPage = async () => {
  return (
    <>
      {/* <!-- ===== Blog Grid Start ===== --> */}
      <section className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl">
            Blog da Scapola
          </h1>
          <p className="text-sm text-body-color md:text-base">
            Confira as últimas notícias, eventos e promoções
          </p>
        </div>

          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {BlogData.map((post, key) => (
              <BlogItem key={key} blog={post} />
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Blog Grid End ===== --> */}
    </>
  );
};

export default BlogPage;