import React from "react";
import Image from "next/image";
import Link from "next/link";
import BlogData from "./blogData";

const RelatedPost = async () => {
  return (
    <>
      <div className="animate_top rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
        <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
          Posts recentes:
        </h4>
        <div>
          {BlogData.slice(0, 5).map((post, key) => (
            <div
              className="mb-7.5 flex flex-wrap items-center gap-4 xl:flex-nowrap 2xl:gap-6"
              key={key}
            >
              <div className="relative h-20 w-20 min-w-20 overflow-hidden rounded-md sm:h-24 sm:w-24 sm:min-w-24">
              {post.mainImage ? (
                  <Image fill src={post.mainImage} alt="Blog" className="object-cover"/>
                ) : (
                  "No image"
                )}
              </div>
              <div className="flex-1">
                <h5 className="text-md font-light text-black transition-all duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
                  <Link href={`/blog/${post._id}`}>
                    {post.title.length > 50 ? `${post.title.slice(0, 50)}...` : post.title}
                  </Link>
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedPost;