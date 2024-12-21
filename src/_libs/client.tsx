/* eslint-disable @typescript-eslint/typedef */
import { Blog, Category } from '@/_type/blog';
import { createClient, MicroCMSListResponse } from 'microcms-js-sdk';
import { notFound } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/typedef
export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN || '',
  apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
});

// 記事一覧を取得
export const getBlogsByCategory = async (
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

export const getCategories = async (categoryId: string): Promise<MicroCMSListResponse<Category>> => {
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
