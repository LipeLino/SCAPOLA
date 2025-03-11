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
        <div className="animate_top mx-auto text-center mb-8">
          <SectionHeader
              headerInfo={{
                title: `Blog`,
                subtitle: ``,
                description: ``,
              }}
            />
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