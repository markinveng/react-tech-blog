"use client"
import { useEffect, useState } from 'react';
import styles from "@/components/BlogContent/BlogContent.module.scss"
import {
  CategoryWithBlogs,
  CategoryName,
  Blog,
} from '@/_type/blog';
import { removeAfterHyphen } from '@/_libs/util';
import TabIcon from './tabIcon/TabIcon';

type BlogContentProps = {
  blogArea: CategoryWithBlogs[];
  categoryList: CategoryName[];
};

export const BlogContent: React.FC<BlogContentProps> = ({
  blogArea,
  categoryList,
}: BlogContentProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [animate, setAnimate] = useState(false);

  const handleTabChange = (index: number) => {
    setAnimate(false);
    setSelectedTab(index);
  };

  useEffect(() => {
    setAnimate(true);
  }, [selectedTab]);

  return (
    <>
      <nav className={styles.tabList}>
        {blogArea.map((category: CategoryWithBlogs, index: number) => {
          // 現在ループ中のカテゴリIDと一致するカテゴリ名を探す
          const foundCategory: CategoryName | undefined = categoryList.find(
            (cat: CategoryName) => cat.categoryId === category.categoryId
          );
          // タブに表示する文字
          const tabLabel: string =
            foundCategory
              ? `${removeAfterHyphen(foundCategory.categoryEN)}`
              : category.categoryId;

          return (
            <button
              key={category.categoryId}
              className={`${styles.tab} ${index === selectedTab ? styles.active : ""
                }`}
              onClick={() => handleTabChange(index)}
            >
              <div className={styles.tabIcon}>
                <TabIcon categoryId={category.categoryId} />
              </div>
              <span className={styles.tabTitle}>{tabLabel}</span>
            </button>
          );
        })}
      </nav>
      <ul className={`${styles.blogList} ${animate ? styles.fadeIn : ''}`}>
        {blogArea[selectedTab]?.blogs.map((blog: Blog) => (
          <li key={blog.id} className={`${styles.blogItem}`}>
            {/* アイキャッチ画像 */}
            {blog.eyecatch && blog.eyecatch.url && (
              <div className={styles.blogEyecatch}>
                <img
                  src={blog.eyecatch.url}
                  alt={blog.title}
                  width={blog.eyecatch.width}
                  height={blog.eyecatch.height}
                />
              </div>
            )}
            {/* 日付（publishedAt を使用している例） */}
            <time className={styles.blogDate} dateTime={blog.publishedAt}>
              {new Date(blog.publishedAt).toLocaleDateString("ja-JP")}
            </time>

            {/* タイトル */}
            <span className={styles.blogTitle}>
              {blog.title.length > 15 ? blog.title.substring(0, 20) + "..." : blog.title}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};