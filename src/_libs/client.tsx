import { createClient, MicroCMSQueries } from 'microcms-js-sdk';
import { notFound } from 'next/navigation';

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN || '',
  apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
});

// カテゴリー一覧を取得
export const getCategoriesList = async (queries: MicroCMSQueries) => {
  try {
    const response = await client.getList({
      endpoint: "categories",
      queries,
    });
    return response;
  } catch (error) {
    console.error("getCategoriesListでエラーが発生しました", error);
    notFound();
  }
};

// 記事一覧を取得
export const getBlogs = async (queries: MicroCMSQueries) => {
  try {
    const response = await client.getList({
      endpoint: "blogs",
      queries,
    });
    return response;
  } catch (error) {
    console.error("getBlogsでエラーが発生しました", error);
    notFound();
  }
};
