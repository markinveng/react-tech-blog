import { notFound } from 'next/navigation';
// MicroCMSやデータ取得用の関数をインポート
import { getBlogById } from '@/_libs/client';
import styles from '@/app/blog/[id]/page.module.scss';
import Header from '@/components/header/Header';
import { MicroCMSContentId } from 'microcms-js-sdk';
import { Blog } from '@/_type/blog';
import Footer from '@/components/footer/Footer';

// 「単一記事」を表す型
type BlogSingle = MicroCMSContentId & Blog;

// 動的ルーティングされたページコンポーネント
export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // MicroCMSから記事詳細を取得
  const blog: BlogSingle = await getBlogById(id).catch(() => notFound());
  console.log(blog);
  
  // 該当記事がなければ 404
  if (!blog) {
    return notFound();
  }

  return (
    <>
      <div className={`${styles.flexWrapper}`}>
        <Header />
        <main className={styles.main}>
          {/* アイキャッチ画像 */}
          {blog.eyecatch?.url && (
            <div className={styles.eyecatch}>
              <img
                src={blog.eyecatch.url}
                alt={blog.title}
                width={blog.eyecatch.width}
                height={blog.eyecatch.height}
              />
            </div>
          )}

          <h1 className={styles.title}>
            {blog.title}
          </h1>

          {/* 日付 */}
          <div className={`${styles.blogInfo}`}>
            <div className={`${styles.publishedWrapper}`}>
              <span className={`${styles.blogInfoTitle}`}>published At</span>
              <time dateTime={blog.publishedAt} className={styles.date}>
                {new Date(blog.publishedAt).toLocaleDateString("ja-JP")}
              </time>
            </div>
            <div className={`${styles.blogCategoryWrapper}`}>
              <span className={`${styles.blogInfoTitle}`}>category</span>
              <span className={`${styles.category}`}>{blog.category.categoryEN}</span>
            </div>

            <div className={`${blog.name ? styles.blogNameWrapper : styles.hidden}`}>
              <span className={`${styles.blogInfoTitle}`}>Written By</span>
              <span className={`${styles.name}`}>{blog.name}</span>
            </div>
          </div>

          {/* 本文 */}
          <article
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </main>
        <Footer className={`${styles.footer}`} />
      </div>
    </>
  );
}