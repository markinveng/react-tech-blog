import { Blog } from '@/_type/blog';
import { createClient, MicroCMSListResponse } from 'microcms-js-sdk';
import { notFound } from 'next/navigation';

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN || '',
  apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
});

// 記事一覧を取得
export const getBlogsByCategory = async (
  categoryId: String,
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
