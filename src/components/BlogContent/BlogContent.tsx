"use client"
import { useState } from 'react';
import styles from "@/components/BlogContent/BlogContent.module.scss"
import {
  CategoryWithBlogs,
  CategoryName,
  Blog,
} from '@/_type/blog';

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
      <ul className={styles.tabList}>
        {blogArea.map((category: CategoryWithBlogs, index: number) => {
          // 現在ループ中のカテゴリIDと一致するカテゴリ名を探す
          const foundCategory : CategoryName | undefined = categoryList.find(
            (cat : CategoryName) => cat.categoryId === category.categoryId
          );
          // タブに表示する文字
          const tabLabel : string =
            foundCategory
              ? `${foundCategory.categoryJP} / ${foundCategory.categoryEN}`
              : category.categoryId; // 見つからなかった場合はカテゴリIDを表示

          return (
            <li
              key={category.categoryId}
              className={`${styles.tab} ${
                index === selectedTab ? styles.active : ""
              }`}
              onClick={() => setSelectedTab(index)}
            >
              {tabLabel}
            </li>
          );
        })}
      </ul>
      {/* 選択中のブログ記事一覧を表示する場合は以下のように使う */}
      <ul>
        {blogArea[selectedTab]?.blogs.map((blog : Blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};