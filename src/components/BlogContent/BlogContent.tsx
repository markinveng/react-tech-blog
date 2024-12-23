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
import Link from 'next/link';
import Image from 'next/image';

type BlogContentProps = {
  blogArea: CategoryWithBlogs[];
  categoryList: CategoryName[];
  pageName: string;
};

export const BlogContent: React.FC<BlogContentProps> = ({
  blogArea,
  categoryList,
  pageName
}: BlogContentProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [animate, setAnimate] = useState(false);

  const handleTabChange: (index: number) => void = (index: number): void => {
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
          <Link key={blog.id} href={`/${pageName}/${blog.id}`} className={`${styles.blogItem}`}>
            <li className={styles.blogItemWrapper}>
              <div className={styles.blogEyecatch}>
                {blog.eyecatch && blog.eyecatch.url ? (
                  <Image
                    src={blog.eyecatch.url}
                    alt={blog.title}
                    width={blog.eyecatch.width}
                    height={blog.eyecatch.height}
                  />
                ) : (<div className={styles.tabIconWrapper}><TabIcon categoryId={blog.category.id} /></div>)}
              </div>
              <div className={styles.blogItemLower}>
                <time className={styles.blogDate} dateTime={blog.publishedAt}>
                  {new Date(blog.publishedAt).toLocaleDateString("ja-JP")}
                </time>
                <span className={styles.blogTitle}>
                  {blog.title.substring(0, 35) + "..."}
                </span>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};