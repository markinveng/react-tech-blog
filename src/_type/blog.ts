export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt?: string;
  title: string;
  content: string;
  eyecatch?: {
    url: string;
    height: number,
    width: number
  };
  category: Category;
};

export type Category = {
  id: string,
  createdAt: string,
  updatedAt: string,
  publishedAt: string
  revisedAt: string
  categoryEN: string
  categoryJP: string
}

export type CategoryWithBlogs = {
  categoryId: Category["id"];
  blogs: Blog[];
};