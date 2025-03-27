"use client";
import { Blog } from "@/types/blog";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../Common/SectionHeader";

const BlogItem = ({ blog }: { blog: Blog }) => {
  const { mainImage, title, metadata, category, author, color, publishedAt } = blog;

  return (  
    <>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="animate_top rounded-lg p-4 shadow-xl shadow-black-600 border-2 border-black-100 hover:shadow-2xl"
      >
        
        <Link href={`/blog/${blog._id}`} className="relative block aspect-[368/239]">
          <Image src={mainImage} alt={title} fill style={{ objectFit: 'cover' }}/>
        </Link> 

        <div className="">
          <h3 className="mt-6 line-clamp-2 inline-block text-lg font-light text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">

            <Link href={`/blog/${blog._id}`} prefetch={false} className="font-bold">
              {`${title.slice(0, 40)}`}
            </Link>

          </h3>
          <p className="line-clamp-3 italic text-lg">{metadata}</p>
          <p className="text-sm mb-1 mt-5 text-gray-500">Publicado em: <span className="font-semibold text-black dark:text-white">{publishedAt}</span></p>
          <p className="text-sm text-gray-500 ">Autor: <span className="font-semibold text-black dark:text-white">{author}</span></p>
          <span className="bg-blue-500 rounded font-semibold text-xs px-1.5 text-white dark:text-white" style={{ backgroundColor: color }}>{category}</span>
        </div>
      </motion.div>
    </>
  );
};

export default BlogItem;
