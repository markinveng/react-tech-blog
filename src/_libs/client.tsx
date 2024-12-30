import { Blog, Category } from '@/_type/blog';
import { createClient, MicroCMSContentId, MicroCMSListResponse } from 'microcms-js-sdk';
import { notFound } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/typedef
export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN || '',
  apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
});

// 記事一覧を取得
export const getBlogsByCategory: (categoryId: string, limit: number) => Promise<MicroCMSListResponse<Blog>> = async (
  categoryId: string,
  limit: number
): Promise<MicroCMSListResponse<Blog>> => {
  try {
    const response: MicroCMSListResponse<Blog> = await client.getList({
      endpoint: "blogs",
      queries: {
        filters: `category[equals]${categoryId}`,
        limit
      },
    });
    return response;
  } catch (error) {
    console.error("getBlogsでエラーが発生しました", error);
    notFound();
  }
};

export const getCategories: (categoryId: string) => Promise<MicroCMSListResponse<Category>> = async (categoryId: string): Promise<MicroCMSListResponse<Category>> => {
  try {
    const response: MicroCMSListResponse<Category> = await client.getList({
      endpoint: "categories",
      queries: {
        filters: `id[equals]${categoryId}`,
      },
    });
    return response;
  } catch (error) {
    console.error("getCategoriesでエラーが発生しました", error);
    notFound();
  }
}

type BlogSingle = MicroCMSContentId & Blog;

export async function getBlogById(id: string): Promise<BlogSingle> {
  try {
    const response: BlogSingle = await client.get<BlogSingle>({
      endpoint: "blogs",
      contentId: id,
    });
    return response;
  } catch (error) {
    console.error("getCategoriesでエラーが発生しました", error);
    notFound();
  }
}

