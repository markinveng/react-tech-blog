"use client"
import { useState } from 'react';
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
              onClick={() => setSelectedTab(index)}
            >
              <div className={styles.tabIcon}>
                <TabIcon categoryId={category.categoryId} />
              </div>
              <span className={styles.tabTitle}>{tabLabel}</span>
            </button>
          );
        })}
      </nav>
      <ul>
        {blogArea[selectedTab]?.blogs.map((blog: Blog) => (
          <li key={blog.id}>
            <span>
              {blog.title}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};