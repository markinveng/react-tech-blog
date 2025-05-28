"use client";
import React from "react";
import styles from "@/components/Pagination/pagination.module.scss";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps): JSX.Element {
  const prevPage: number = currentPage - 1;
  const nextPage: number = currentPage + 1;

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.pagination}>
        {/* 最初のページでは「＜」「≪」非表示 */}
        {currentPage !== 1 ? (
          <>
            <button className={styles.firstIcon} onClick={() => onPageChange(1)}>≪</button>
            <button className={styles.prevIcon} onClick={() => onPageChange(currentPage - 1)}>＜</button>
          </>
        ) : <span className={styles.margin}></span>}

        {/* 左側ページ番号（1つ前）*/}
        {prevPage >= 1 ? <span className={styles.prevNum}>{prevPage}</span> : <span className={styles.margin} style={{ width: '1.5em' }} ></span>}

        {/* 現在ページ（強調表示） */}
        <span className={styles.currentNum} style={{ fontWeight: 'bold' }}>{currentPage}</span>

        {/* 右側ページ番号（1つ後）*/}
        {nextPage <= totalPages ? <span className={styles.nextNum}>{nextPage}</span> : <span style={{ width: '1.5em' }} />}

        {/* 最後のページでは「＞」「≫」非表示 */}
        {currentPage !== totalPages ? (
          <>
            <button className={styles.nextIcon} onClick={() => onPageChange(currentPage + 1)}>＞</button>
            <button className={styles.lastIcon} onClick={() => onPageChange(totalPages)}>≫</button>
          </>
        ) : <span className={styles.margin}></span>}
      </div>
    </div>
  );
}
