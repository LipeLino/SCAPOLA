/*export type Author = {
  name: string;
  image: string;
  bio?: string;
  _id?: number | string;
  _ref?: number | string;
};*/

export type Blog = {
  _id: number;
  title: string;
  slug?: any;
  metadata?: string;
  body?: string;
  mainImage?: any;
  optionalImage?: any;
  author?: string;
  tags?: string[];
  publishedAt?: string;
  category?: string;
  color: string;
};
