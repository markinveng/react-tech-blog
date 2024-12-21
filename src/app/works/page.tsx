import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header'
import styles from "@/app/works/page.module.scss"
import { getBlogs, getCategoriesList } from "@/_libs/client";
import { notFound } from 'next/navigation';
import { LIMIT } from '@/_constants/blog';
import Link from 'next/link';

export default async function WorksPage() {
  // ブログ一覧を取得
  const articlesListQueries = { limit: LIMIT };
  const articlesListResponse = await getBlogs(articlesListQueries).catch(() => notFound());

  // カテゴリ一覧を取得
  const categoriesListQueries = { limit: 10 };
  const categoriesListResponse = await getCategoriesList(categoriesListQueries).catch(() => notFound());
  console.log(categoriesListResponse);


  // 記事データが存在しない場合は何も表示しない
  if (!articlesListResponse?.contents || articlesListResponse.contents.length === 0) {
    return <p>No articles found.</p>;
  }

  return (
    <>
      <div className={`${styles.flexWrapper}`}>
        <Header />
        <main>
          <h1 className={`${styles.title}`}>Works</h1>

          <div>
            {
              categoriesListResponse.contents.map(item => (
                <Link href={`/category/${item.id}`} key={item.id} className={`${styles.categoryLink}`}>
                  {item.category}
                </Link>
              ))
            }
          </div>

          {/* 記事リストを表示 */}
          <div>
            {articlesListResponse.contents.map(article => (
              <div key={article.id} className={`${styles.article}`}>
                <h2>{article.title}</h2>
              </div>
            ))}
          </div>



          {/* <ul className={`${styles.tabList}`}>
            <li className={`${styles.tab}`}>Development</li>
            <li className={`${styles.tab}`}>Design</li>
            <li className={`${styles.tab}`}>Music</li>
          </ul> */}
          {/* <ul className={`${styles.worksList}`} /> */}
        </main>
        <Footer className={`${styles.footer}`} />
      </div>
    </>
  );
}