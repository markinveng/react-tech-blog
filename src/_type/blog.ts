// microCMSレスポンス型
export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

// Blog型
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
    height: number;
    width: number;
  };
  category: Category;
};

// Category型
export type Category = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  categoryEN: string;
  categoryJP: string;
};

// カテゴリID + ブログ記事一覧
export type CategoryWithBlogs = {
  categoryId: string;
  blogs: Blog[];
};

// カテゴリID + EN/JP
export type CategoryName = {
  categoryId: string;
  categoryEN: string;
  categoryJP: string;
};
