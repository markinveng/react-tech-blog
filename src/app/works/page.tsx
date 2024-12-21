import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header'
import styles from "@/app/works/page.module.scss"
import { getBlogsByCategory, getCategories } from "@/_libs/client";
import { LIMIT_PER_CATEGORY, WORK_CATEGORY_ID } from '@/_constants/blog';
import { BlogContent } from '@/components/BlogContent/BlogContent';
import {
  Blog,
  Category,
  CategoryWithBlogs,
  CategoryName,
  MicroCMSListResponse,
} from '@/_type/blog';

export default async function WorksPage(): Promise<JSX.Element> {
  // カテゴリ情報の取得
  // microCMSのレスポンスが [ { contents: Category[] }, ... ] になる想定
  const categoryList: MicroCMSListResponse<Category>[] = await Promise.all(
    WORK_CATEGORY_ID.map((categoryId: string) => {
      return getCategories(categoryId);
    })
  );

  // カテゴリ名リスト（CategoryName[]）を作成
  //   例: data.contents[0] を使用して先頭のカテゴリを取り出す（単一カテゴリ想定）
  const categoryNames: CategoryName[] = categoryList.map(
    (data: MicroCMSListResponse<Category>, index: number) => {
      const firstCategory: Category = data.contents[0];
      // レスポンスがない場合を考慮してエラー回避
      if (!firstCategory) {
        return {
          categoryId: WORK_CATEGORY_ID[index],
          categoryEN: "",
          categoryJP: "",
        };
      }
      return {
        categoryId: WORK_CATEGORY_ID[index],
        categoryEN: firstCategory.categoryEN,
        categoryJP: firstCategory.categoryJP,
      };
    }
  );

  // カテゴリに該当する記事一覧を取得
  const allWorksData: MicroCMSListResponse<Blog>[] = await Promise.all(
    WORK_CATEGORY_ID.map((categoryId: string) => {
      return getBlogsByCategory(categoryId, LIMIT_PER_CATEGORY);
    })
  );

  // データ構造: [{ categoryId: "category1Id", blogs: [...] }, ...]
  const blogs: CategoryWithBlogs[] = allWorksData.map(
    (data: MicroCMSListResponse<Blog>, index: number) => ({
      categoryId: WORK_CATEGORY_ID[index],
      blogs: data.contents || [],
    })
  );

  // コンポーネントに両方渡す
  return (
    <>
      <div className={`${styles.flexWrapper}`}>
        <Header />
        <main>
          <h1 className={`${styles.title}`}>Works</h1>
          <BlogContent blogArea={blogs} categoryList={categoryNames} />
        </main>
        <Footer className={`${styles.footer}`} />
      </div>
    </>
  );
}
