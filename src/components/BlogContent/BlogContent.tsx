"use client"
import { useState } from 'react';
import styles from "@/components/BlogContent/BlogContent.module.scss"
import { CategoryWithBlogs } from '@/_type/blog';

type BlogContentProps = {
  blogArea: CategoryWithBlogs[]
}


export const BlogContent: React.FC<BlogContentProps> = ({ blogArea }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  // 現在選択中のカテゴリの記事
  const currentBlogs = blogArea[selectedTab]?.blogs || [];

  return (
    <>
      <ul className={`${styles.tabList}`}>
        {blogArea.map((category, index) => (
          <li
            key={category.categoryId}
            className={`${styles.tab} ${index === selectedTab ? styles.active : ""
              }`}
            onClick={() => setSelectedTab(index)}
          >
            カテゴリ {index + 1}
          </li>
        ))}
      </ul>
    </>
  )
}