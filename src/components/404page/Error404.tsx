import Link from "next/link";
import styles from '@/components/404page/Error404.module.scss';

export default function Error404(): JSX.Element {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>404 - ページが見つかりません</h1>
        <Link className={styles.homeLink} href="/">
          Topページに戻る
        </Link>
      </div>
    </>
  )
}