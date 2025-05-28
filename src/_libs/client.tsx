/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient, MicroCMSContentId, MicroCMSListResponse } from 'microcms-js-sdk';
import { notFound } from 'next/navigation';

export type ImageItem = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  img: {
    url: string;
    height: number;
    width: number;
  };
  url: string;
  description: string;
};

// eslint-disable-next-line @typescript-eslint/typedef
export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN || '',
  apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
});

export const getImagesByPage = async (
  currentPage: number,
  limit: number = 5
): Promise<{ contents: ImageData[]; totalCount: number }> => {
  // 全件数取得（1件だけ取得してtotalCountを得る）
  const { totalCount } = await client.getList({
    endpoint: "works",
    queries: { limit: 1 },
  });

  // 取得開始位置（新しい順にページネーションしたいので逆に計算）
  const startIndex = totalCount - currentPage * limit;
  const offset = Math.max(startIndex, 0);
  const actualLimit = startIndex < 0 ? limit + startIndex : limit;

  // データ取得（createdAtの昇順 → reverseで新しい順に）
  const { contents } = await client.getList<ImageData>({
    endpoint: "works",
    queries: {
      offset,
      limit: actualLimit,
      orders: "createdAt", // 昇順で取得
    },
  });

  return {
    contents: contents.reverse(), // 表示は降順（新しい順）
    totalCount,
  };
};

// 記事一覧を取得
// export const getBlogsByCategory: (categoryId: string, limit: number) => Promise<MicroCMSListResponse<Blog>> = async (
//   categoryId: string,
//   limit: number
// ): Promise<MicroCMSListResponse<Blog>> => {
//   try {
//     const response: MicroCMSListResponse<Blog> = await client.getList({
//       endpoint: "blogs",
//       queries: {
//         filters: `category[equals]${categoryId}`,
//         limit
//       },
//     });
//     return response;
//   } catch (error) {
//     console.error("getBlogsでエラーが発生しました", error);
//     notFound();
//   }
// };

// export const getCategories: (categoryId: string) => Promise<MicroCMSListResponse<Category>> = async (categoryId: string): Promise<MicroCMSListResponse<Category>> => {
//   try {
//     const response: MicroCMSListResponse<Category> = await client.getList({
//       endpoint: "categories",
//       queries: {
//         filters: `id[equals]${categoryId}`,
//       },
//     });
//     return response;
//   } catch (error) {
//     console.error("getCategoriesでエラーが発生しました", error);
//     notFound();
//   }
// }

// type BlogSingle = MicroCMSContentId & Blog;

// export async function getBlogById(id: string): Promise<BlogSingle> {
//   try {
//     const response: BlogSingle = await client.get<BlogSingle>({
//       endpoint: "blogs",
//       contentId: id,
//     });
//     return response;
//   } catch (error) {
//     console.error("getCategoriesでエラーが発生しました", error);
//     notFound();
//   }
// }

