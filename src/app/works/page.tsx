import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header'
import styles from "@/app/works/page.module.scss"
import { getBlogsByCategory } from "@/_libs/client";
import { LIMIT_PER_CATEGORY, WORK_CATEGORY_ID } from '@/_constants/blog';
import { BlogContent } from '@/components/BlogContent/BlogContent';
import { Blog, CategoryWithBlogs, MicroCMSListResponse } from '@/_type/blog';

export default async function WorksPage() {
  //カテゴリに該当する記事一覧を取得
  const allWorksData: MicroCMSListResponse<Blog>[] = await Promise.all(
    WORK_CATEGORY_ID.map((categoryId) => {
      return getBlogsByCategory(categoryId, LIMIT_PER_CATEGORY);
    })
  )
  // データ構造: [{ categoryId: "category1Id", blogs: [...] }, ...]
  const blogs: CategoryWithBlogs[] = allWorksData.map((data, index) => ({
    categoryId: WORK_CATEGORY_ID[index],
    blogs: data.contents || [],
  }));

  // 初期タブの状態
  return (
    <>
      <div className={`${styles.flexWrapper}`}>
        <Header />
        <main>
          <h1 className={`${styles.title}`}>Works</h1>
          <BlogContent blogArea={blogs} />
        </main>
        <Footer className={`${styles.footer}`} />
      </div>
    </>
  );
}